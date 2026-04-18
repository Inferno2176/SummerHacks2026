---
description: Skill to compute Resonance Gaps between a Master Resume and a Job Description.
---

# Skill: Job Matcher

## Objective
Analyze the provided `resume` against the target `jd` (Job Description) to determine Resonance Gaps.

## Output Format
Return a strict JSON object mapping out the differences:
{
  "missingKeywords": ["string"],
  "underemphasizedSkills": ["string"],
  "resonanceScore": "number (0-100)"
}

## Output Constraints (CRITICAL)
- **Self-Correction Rule:** Check the output before returning. If it contains ` ```json ` or any text outside the `{ }`, YOU MUST DELETE IT. Return ONLY the raw JSON object.
- Never wrap the response in markdown blocks.
