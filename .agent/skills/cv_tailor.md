---
description: Skill to rewrite Resume Bullets based on Job Description gaps.
---

# Skill: CV Tailor

## Objective
Take the `resume` object and the computed `gaps` object. Return the SAME resume schema, but slightly rewrite the bullet points (desc) in `jobs` and `internships` to hit the missingKeywords and underemphasizedSkills. 

## Strict Schema Output
You must output the exact same schema structure as the master resume, but with tailored data:
{
  "name": "string",
  "email": "string",
  "location": "string",
  "objective": "string",
  "internships": [{ "role": "string", "org": "string", "dates": "string", "desc": "string", "isTailored": true }],
  "jobs": [{ "role": "string", "org": "string", "dates": "string", "desc": "string", "isTailored": true }],
  "education": "string",
  "skills": ["string"],
  "accomplishments": "string"
}

## Rule
Whenever you change a bullet point or optimize a description, ensure you add the field: `"isTailored": true` to that specific job or internship block. Ensure the objective is also dialed toward the JD.

## Output Constraints (CRITICAL)
- **Self-Correction Rule:** Check the output before returning. If it contains ` ```json ` or any text outside the `{ }`, YOU MUST DELETE IT. Return ONLY the raw JSON object.
- Never wrap the response in markdown blocks.
