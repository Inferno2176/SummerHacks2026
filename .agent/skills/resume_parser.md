---
description: Skill to parse unstructured resume text into a structured profile.
---

# Skill: Resume Parser

## Objective
Convert raw text from a CV/Resume into the following strict JSON schema.

## Schema
{
  "name": "string",
  "email": "string",
  "skills": ["string"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "bullets": ["string"]
    }
  ]
}

## Prompt Details
- Identify the candidate's full name and contact information.
- Extract high-level skills (tech stack, tools, methodologies).
- Break down work history into specific company/role blocks.
- Preserve the tone of professional experience but ensure bullets are concise.

## Constraints
- Follow all rules in `.agent/rules/api_constraints.md`.
- Ensure the output is strictly valid JSON.
