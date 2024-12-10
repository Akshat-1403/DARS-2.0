require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier'); // For streaming file uploads to Cloudinary
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const app = express();

app.use(cors({
  origin: '*'
}))

const PORT = 3000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const hash = req.body.hash;

  if (!file || !hash) {
    return res.status(400).send("File or hash missing");
  }

  // Upload the file to Cloudinary
  const uploadStream = cloudinary.uploader.upload_stream(
    { resource_type: 'raw', public_id: hash }, // Store as a raw file with the hash as its ID
    (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).send("Failed to upload file");
      }
      res.send(`File uploaded successfully! Cloudinary URL: ${result.secure_url}`);
    }
  );

  streamifier.createReadStream(file.buffer).pipe(uploadStream);
});

app.get('/download/:hash', (req, res) => {
  const hash = req.params.hash;
  const url = cloudinary.url(hash, { resource_type: 'raw' });

  // Redirect the client to the Cloudinary URL
  res.redirect(url);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});