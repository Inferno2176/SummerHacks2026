const express = require('express');
const router = express.Router();

// Hardcoded mock jobs based on plan.md Phase 1 requirement
const mockJobs = [
    {
        id: "job_1",
        title: "Frontend Engineer",
        company: "Vercel",
        salary: "$120k - $150k",
        matchScore: 92,
        requiredSkills: ["React", "Next.js", "TailwindCSS"],
        status: "Saved"
    },
    {
        id: "job_2",
        title: "Fullstack Developer",
        company: "Stripe",
        salary: "$140k - $170k",
        matchScore: 85,
        requiredSkills: ["Node.js", "React", "PostgreSQL"],
        status: "Applied"
    },
    {
        id: "job_3",
        title: "AI Engineer",
        company: "Anthropic",
        salary: "$160k - $200k",
        matchScore: 78,
        requiredSkills: ["Python", "LLMs", "RAG"],
        status: "Interviewing"
    }
];

router.get('/', (req, res) => {
    res.status(200).json({ jobs: mockJobs });
});

module.exports = router;
