const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Multer storage configuration to store the file temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const hash = req.body.hash;

  if (!file || !hash) {
    return res.status(400).send("File or hash missing");
  }

  // Define the destination path with the hash as the filename
  const filePath = path.join(__dirname, 'uploads', `${hash}.pdf`);

  // Write the file to the destination path
  fs.writeFile(filePath, file.buffer, (err) => {
    if (err) {
      console.error("Error saving file:", err);
      return res.status(500).send("Failed to save file");
    }
    res.send("File uploaded and saved successfully!");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});