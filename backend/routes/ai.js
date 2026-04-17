const express = require('express');
const router = express.Router();

router.post('/analyze', async (req, res) => {
    // Placeholder for JD Analyzer Agent
    res.status(200).json({ status: "analyzed", mockSkills: ["React", "Node"] });
});

module.exports = router;
