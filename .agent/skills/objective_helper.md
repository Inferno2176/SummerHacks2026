---
description: Skill to generate a concise, 1-sentence career objective based on user details.
---

# Skill: Objective Helper

## Objective
Generate a professional, high-impact 1-sentence career objective or professional summary draft based on the user's name, role, or background provided in the input.

## Schema
{
  "suggestion": "string"
}

## Prompt Details
- Input: User profile details (Name, current skills, or interests).
- Generate exactly one sentence.
- Tone: Professional, ambitious, and sanctuary-themed (e.g., using words like 'orchestrating', 'designing', 'sanctuary', 'ecosystem' where appropriate).
- Ensure the result is under 200 characters to leave room for user edits.

## Constraints
- Follow all rules in `.agent/rules/api_constraints.md`.
- Output ONLY the JSON object.
