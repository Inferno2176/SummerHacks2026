---
description: Skill to parse onboarding/user profile context into a structured, professional master resume.
---

# Skill: Resume Parser

## Objective
Convert raw data from a user's profile and questionnaire into a professionally crafted Master Resume using the EXACT strict JSON schema below. Do NOT deviate.

## Strict Required Schema
{
  "name": "string",
  "email": "string",
  "location": "string",
  "objective": "string",
  "internships": [{ "role": "string", "org": "string", "dates": "string", "desc": "string" }],
  "jobs": [{ "role": "string", "org": "string", "dates": "string", "desc": "string" }],
  "education": "string",
  "skills": ["string"],
  "accomplishments": "string"
}

## Intelligent Synthesis Instructions
1. **Executive Summary:** Transform the user's raw 'Goals' or objective inputs into a polished 2-sentence executive summary.
2. **Experience Split:** Strictly separate jobs and internships into the two distinct arrays. If one type doesn't exist, return an empty array `[]`.
3. **Bullet Optimization:** Convert raw, lengthy paragraph descriptions into 3-4 professional bullet points using strong action verbs (e.g. "Architected", "Engineered", "Optimized"). Format them as a single string with `•` bullet markers or simply a cohesive string of bullets separated by newlines. No bold tags.

## Output Constraints (CRITICAL)
- **Self-Correction Rule:** Check the output before returning. If it contains ` ```json ` or any text outside the `{ }`, YOU MUST DELETE IT. Return ONLY the raw JSON object.
- Never wrap the response in markdown blocks.
