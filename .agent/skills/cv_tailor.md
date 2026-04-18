---
description: Skill to optimize resume bullets to align with a specific Job Description.
---

# Skill: CV Tailor

## Objective
Rewrite specific work experience bullets to highlight relevance to a target Job Description (JD).

## Schema
{
  "tailoredBullets": [
    {
      "original": "string",
      "optimized": "string",
      "reason": "string"
    }
  ]
}

## Prompt Details
- Input: Current Resume Bullets + Target Job Description.
- For each bullet, provide an `optimized` version that uses keywords and metrics relevant to the JD without lying.
- `reason`: Briefly explain why the optimization is more effective for this specific JD.

## Constraints
- Follow all rules in `.agent/rules/api_constraints.md`.
- Never hallucinate certifications or years of experience that don't exist in the `original` bullet.
- Output ONLY the JSON object.
