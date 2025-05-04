const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const stripe = require('stripe')('sk_test_51RKx3p4FdSrBJNVnTl2KQrOmeIaLnLcT0X9LKaa1KOS7liWq9jvAIUFi6dDs01DWkFJ23BG8DflPopIH5uKGsybi00CXS7dLjl');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require("path");
const admin = require("firebase-admin");

const app = express();
const upload = multer();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Firebase Admin SDK
const serviceAccount = require("./firebaseServiceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Cloudflare R2 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.R2_ACCESS_KEY,
  secretAccessKey: process.env.R2_SECRET_KEY,
  endpoint: process.env.R2_ENDPOINT,
  signatureVersion: 'v4',
  region: 'auto',
});

// MongoDB connection for Animal Map
mongoose.connect('mongodb://localhost:27017/animalmap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SpotSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  image: String,
  createdAt: { type: Date, default: Date.now },
});
const Spot = mongoose.model('Spot', SpotSchema);

// Routes for animal spots
app.get('/spots', async (req, res) => {
  const spots = await Spot.find();
  res.json(spots);
});

app.post('/spots', async (req, res) => {
  const { lat, lng, image } = req.body;
  const newSpot = new Spot({ lat, lng, image });
  await newSpot.save();
  res.json({ success: true });
});

// Stripe payment route
app.post('/payment', async (req, res) => {
  const { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: id,
      confirm: true
    });

    res.status(200).json({ message: 'Payment successful', success: true });
  } catch (error) {
    res.status(400).json({ message: 'Payment failed', error });
  }
});

// File upload to Cloudflare R2
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

// MongoDB connection for Community posts
const communityDB = mongoose.createConnection("mongodb://localhost:27017/community", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import post routes and use them
const postRoutes = require("./routes/postRoutes");
app.use("/uploads", express.static("uploads"));
app.use("/api/posts", postRoutes(communityDB));

// Start server
app.listen(4000, () => console.log('🚀 Server running on http://localhost:4000'));
