"use server";

import fs from 'fs';
import path from 'path';

/**
 * Executes a specific agent skill using the Google Gemini API.
 * Reads rules and skills from the .agent folder.
 */
export async function runAgentSkill(skillName: string, inputData: any) {
  try {
    const rootDir = process.cwd();
    
    // 1. Read files (Handle case where .agent is in parent dir)
    let agentDir = path.join(rootDir, '.agent');
    if (!fs.existsSync(agentDir)) {
      agentDir = path.join(rootDir, '..', '.agent');
    }

    const rulesPath = path.join(agentDir, 'rules', 'api_constraints.md');
    const skillPath = path.join(agentDir, 'skills', `${skillName}.md`);

    if (!fs.existsSync(rulesPath) || !fs.existsSync(skillPath)) {
      throw new Error(`Agent configuration missing at ${agentDir}`);
    }

    const rules = fs.readFileSync(rulesPath, 'utf8');
    const skill = fs.readFileSync(skillPath, 'utf8');

    // 2. Prepare the prompt for Gemini
    const combinedPrompt = `
${rules}

${skill}

Input Data:
${JSON.stringify(inputData, null, 2)}
`;

    // 3. Call Gemini API
    const apiKey = process.env.Gemini_API_KEY;
    if (!apiKey) throw new Error("Gemini_API_KEY is not defined in environment.");

    // The Gemini endpoint (using v1beta for stability/features)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: combinedPrompt }]
        }],
        generationConfig: {
          temperature: 0.2, // Low temp for JSON accuracy
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    // Gemini response structure: candidates[0].content.parts[0].text
    const rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!rawOutput) {
      throw new Error("Gemini produced an empty response.");
    }

    // Our constraints ensure the output string is ONLY raw JSON.
    // However, sometimes Gemini includes markdown blocks like ```json ... ```
    let sanitizedOutput = rawOutput.trim();
    if (sanitizedOutput.startsWith('```json')) {
      sanitizedOutput = sanitizedOutput.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (sanitizedOutput.startsWith('```')) {
       sanitizedOutput = sanitizedOutput.replace(/^```/, '').replace(/```$/, '').trim();
    }

    try {
      return JSON.parse(sanitizedOutput);
    } catch (parseError) {
      console.error("Failed to parse Gemini output as JSON:", sanitizedOutput);
      throw new Error("AI Agent produced invalid JSON formatting. Please try again.");
    }

  } catch (error) {
    console.error("Agent Skill Execution Failed:", error);
    throw error;
  }
}
