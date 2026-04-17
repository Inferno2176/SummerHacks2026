# 🤖 Agent Architecture: Job Search Copilot

This document outlines the architecture and usage of the AI agents within the Hackathon project. The AI engine is responsible for parsing job descriptions, scoring profiles, and generating tailored application assets.

## 🔐 Security & Credentials

**CRITICAL RULE:** Absolutely **NO** hardcoded API keys, database URLs, or secrets in the source code.

All credentials must be loaded from a `.env` file via environment variables.

### Example `.env` Configuration
```env
# ==========================================
# Application Environment Variables
# ==========================================

# LLM Providers
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Database
DATABASE_URL=your_postgresql_connection_string
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Optional APIs (e.g., Job scraping)
PROXY_API_KEY=your_proxy_provider_key
```

### Loading Environment Variables
In your backend/agent code, ensure you use environment variables (e.g., `os.getenv("OPENAI_API_KEY")` in Python, or `process.env.OPENAI_API_KEY` in Node.js). 

---

## 🧠 The Agentic Pipeline

The system is broken down into four specialized AI sub-agents to ensure high quality, hallucination-free outputs.

### 1. The JD Analyzer Agent
*   **Role:** Extract objective data from a raw Job Description text.
*   **Input:** Raw Job Description (Scraped text).
*   **Output:** Structured JSON containing: Required Skills, Preferred Skills, Years of Experience, Company Tone/Culture.
*   **Prompt Strategy:** Few-shot prompting with strict JSON formatting instructions.

### 2. The Match Scoring Agent
*   **Role:** Evaluate the user's base profile against the structured JD data.
*   **Input:** User Profile (JSON) + Structured JD (JSON).
*   **Output:** An AI Match Score (0-100%) and a list of "Missing Skills".
*   **Use Case:** Displayed as the gradient-filled "AI Match Score" pill in the *Job Matches Feed*.

### 3. The CV Tailoring Agent
*   **Role:** Rewrite specific resume bullet points to better align with the job description without hallucinating experiences.
*   **Input:** User's base CV bullet points + Structured JD.
*   **Output:** Modified bullet points that emphasize the required skills naturally.
*   **Constraints:** Must be strictly instructed to *reframe* existing experience, not invent new jobs or degrees.

### 4. The drafting Agent (Cover Letter Studio)
*   **Role:** Generate a highly customized, compelling cover letter.
*   **Input:** User Profile + Structured JD + Company Information.
*   **Output:** A 3-4 paragraph markdown text.
*   **Tone:** The agent should adopt a tone matching the "Company Tone/Culture" extracted by Agent 1 (e.g., formal for finance, enthusiastic for startups).

---

## 🛠️ Implementation Guidelines

1. **Structured Outputs:** Always force agents to return structured formats (e.g., using OpenAI's JSON mode or function calling features) to ensure deterministic behavior for the frontend UI.
2. **Streaming:** For the Cover Letter generation in "The Studio" view, implement streaming responses (Server-Sent Events) so the user sees the text appearing progressively.
3. **Prompt Versioning:** Keep your system prompts inside a dedicated `prompts/` directory to easily update them without touching business logic.
