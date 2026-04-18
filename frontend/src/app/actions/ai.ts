"use server";

import fs from 'fs';
import path from 'path';

/**
 * Executes a specific agent skill using the Antigravity Agent API.
 * Reads rules and skills from the .agent folder.
 */
export async function runAgentSkill(skillName: string, inputData: any) {
  try {
    const rootDir = process.cwd(); // Root of the project (assuming root workspace)
    
    // 1. Read strict API constraints
    const rulesPath = path.join(rootDir, '..', '.agent', 'rules', 'api_constraints.md');
    const skillPath = path.join(rootDir, '..', '.agent', 'skills', `${skillName}.md`);

    const rules = fs.readFileSync(rulesPath, 'utf8');
    const skill = fs.readFileSync(skillPath, 'utf8');

    // 2. Prepare the combined prompt
    const systemPrompt = `
${rules}

${skill}

Input Data for Processing:
${JSON.stringify(inputData, null, 2)}
`;

    // 3. Call Antigravity Agent API
    // Using Agent ID: 1 as identified in the system environment
    const apiKey = process.env.Gemini_API_KEY; // Reusing the AQ. key
    const appId = process.env.ANTIGRAVITY_APP_ID || "1";

    const response = await fetch(`https://api.antigravity.ai/v1/agents/${appId}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: systemPrompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Agent API error: ${response.status} ${await response.text()}`);
    }

    const result = await response.json();
    
    // The Agent API typically returns { output: "..." }
    // Our constraints ensure the output string is raw JSON.
    try {
      return JSON.parse(result.output.trim());
    } catch (parseError) {
      console.error("Failed to parse Agent output as JSON:", result.output);
      throw new Error("AI Agent produced invalid JSON formatting. Please try again.");
    }

  } catch (error) {
    console.error("Agent Skill Execution Failed:", error);
    throw error;
  }
}
