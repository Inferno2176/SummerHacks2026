const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure multer for in-memory storage, useful before uploading to Firebase
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // TODO: Integrate Firebase Storage here later.
        console.log("File received:", req.file.originalname);
        
        // Mocking a successful upload and OCR parsing
        res.status(200).json({ 
            message: 'Resume uploaded successfully',
            mockParsedData: {
                name: "John Doe",
                skills: ["React", "Next.js", "Node.js"],
                experience: "5 years"
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload resume.' });
    }
});

module.exports = router;
