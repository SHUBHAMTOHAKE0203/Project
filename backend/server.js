const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
const upload = multer();

app.use(cors());

// R2 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.R2_ACCESS_KEY,
  secretAccessKey: process.env.R2_SECRET_KEY,
  endpoint: process.env.R2_ENDPOINT,
  signatureVersion: 'v4',
  region: 'auto',
});

// Upload route
app.post('/upload-to-r2', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const key = `profiles/${Date.now()}_${file.originalname}`;

  const params = {
    Bucket: process.env.R2_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    await s3.putObject(params).promise();
    const fileUrl = `${process.env.VOLA}/${process.env.R2_BUCKET}/${key}`;
    res.json({ url: fileUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));
