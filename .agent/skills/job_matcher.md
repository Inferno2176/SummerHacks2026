---
description: Skill to compare a parsed resume against a Job Description.
---

# Skill: Job Matcher

## Objective
Analyze a candidate's profile against a Job Description (JD) to determine suitability and identify gaps.

## Schema
{
  "matchPercentage": number,
  "keyMatches": ["string"],
  "missingSkills": ["string"],
  "reasoning": "string"
}

## Prompt Details
- Input: Parsed Resume (JSON) + Raw Job Description (Text).
- Calculate a realistic match percentage (0-100).
- `keyMatches`: List strings from the resume that directly satisfy JD requirements.
- `missingSkills`: List required skills/tech from the JD that are not present in the resume.
- `reasoning`: A 2-3 sentence summary of why this candidate is or isn't a good fit.

## Constraints
- Follow all rules in `.agent/rules/api_constraints.md`.
- Output ONLY the JSON object.
