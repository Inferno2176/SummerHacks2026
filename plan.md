# 🚀 Project Plan: Job Application Agent
**Hackathon:** ITM SFT SummerHacks '26  
**Track:** AI Agents, Automation & Smart Assistants  
**Team Name:** hecker  

## 🎯 Objective
Build a "Job Search Copilot" that fully automates the application pipeline: job discovery, CV/Cover Letter tailoring, application tracking, and follow-up nudges.

## 👥 Team Allocation (4 Members)
**1. Frontend Developer & UI/UX**
* **Responsibility:** Build the user-facing web app. Focuses on the dashboard, document viewers, and Kanban board.
* **Goal:** Create a clean, "command center" aesthetic (think Linear or Notion). Hand off layout requirements to Stitch.

**2. AI / LLM Engineer**
* **Responsibility:** Build the reasoning engine.
* **Goal:** Create prompts and pipelines to extract keywords from Job Descriptions (JDs), score user profiles against JDs, and generate highly customized, hallucination-free Cover Letters and CV bullet points.

**3. Backend & Data Engineer**
* **Responsibility:** The data pipeline and infrastructure.
* **Goal:** Build scrapers/API connections for job boards (e.g., LinkedIn, Indeed), manage the database (Supabase/Firebase) for storing user data and job statuses, and build backend endpoints.

**4. Product Manager & Integration/Pitch**
* **Responsibility:** The glue and the story.
* **Goal:** Manage the chronological nudge logic (cron jobs/event triggers), ensure all parts integrate smoothly, build the presentation slide deck, and prepare a flawless live demo.

---

## 🗺️ Website Architecture (Hand-off to Stitch)
*Provide these specific layout requirements to Stitch for the website design.*

### 1. Global Navigation
* **Sidebar:** Dashboard, Job Matches, Application Tracker, Profile/Settings.
* **Top Bar:** "Add Job Manually" button, Search bar, Notifications Bell (for follow-up nudges).

### 2. Core Views & Components
* **View A: The Command Center (Home Dashboard)**
  * **Top Row:** Quick stats (Jobs Scraped, Applications Sent, Interviews, Rejections).
  * **Main Section:** "Action Items" feed (e.g., ⚠️ *Nudge: It's been 5 days since you applied to Google. Send a follow-up email.*)
* **View B: Job Matches (The Feed)**
  * List or grid of job cards.
  * **Card UI:** Company Logo, Role Title, Salary (if available), and an **AI Match Score** (e.g., 85% Match).
  * **Actions:** [Tailor Application] or [Dismiss].
* **View C: The Studio (Document Review)**
  * Split-screen interface.
  * **Left Pane:** The original Job Description with highlighted keywords.
  * **Right Pane:** The AI-generated Cover Letter and tailored CV. Include "Edit" and "Export to PDF" buttons.
* **View D: Application Tracker (CRM)**
  * A Kanban board interface.
  * **Columns:** Saved, Materials Generated, Applied, Interviewing, Rejected, Offer.
  * Cards should display the date of the last status change to calculate nudges.

---

## 🛠️ Execution Timeline (Hackathon Pacing)

### Phase 1: Core Architecture (0-30% Time)
* Setup GitHub repo and standard tech stack (Next.js, FastAPI/Node, PostgreSQL).
* Build basic user profile input form (upload base CV).
* Hardcode 5-10 job listings for initial testing instead of relying purely on live scrapers immediately.

### Phase 2: AI Engine & Design (30-70% Time)
* **Frontend:** Stitch designs the UI and the frontend dev wires up the static components.
* **AI:** Create the core LLM chain: `Base Profile + JD -> Tailored Cover Letter`.
* **Backend:** Connect the Kanban board state to the database.

### Phase 3: The "Magic" & Polish (70-100% Time)
* Implement the "Nudge System" (simulate time passing for the demo).
* Refine the UI (loading states for AI generation).
* Rehearse the pitch: Show the problem (messy spreadsheets) -> Show the solution (our automated copilot).

## 💡 Winning Edge for the Pitch
* **The "So What?":** Emphasize that job hunting in 2025 is a data-entry and formatting problem. Your agent gives humans their time back so they can focus on actual interviews.
* **The Demo Trick:** Don't just show a finished application. Show the AI *live-editing* a CV bullet point to directly address a specific obscure requirement in a job description.
