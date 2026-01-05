const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const data = await pdfParse(req.file.buffer);

    res.json({
      resumeText: data.text
    });
  } catch (err) {
    console.error("PDF ERROR:", err);
    res.status(500).json({ error: "PDF parsing failed" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on port 5000");
});
