const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const admin = require("firebase-admin");

const upload = multer({ dest: "uploads/" });

module.exports = (communityDB) => {
  const router = express.Router();

  const PostSchema = new mongoose.Schema({
    text: String,
    image: String,
    userId: String,
    username: String,
    comments: [
      {
        text: String,
        userId: String,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    reports: [String],
    createdAt: { type: Date, default: Date.now }
  });

  const Post = communityDB.model("Post", PostSchema);

  async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      req.user = decoded;
      next();
    } catch {
      res.status(401).send("Unauthorized");
    }
  }

  router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    const { text } = req.body;
    const image = req.file ? req.file.path : null;
    const post = new Post({
      text,
      image,
      userId: req.user.uid,
      username: req.user.name || req.user.email,
      comments: [],
      reports: [],
    });
    await post.save();
    res.status(201).send(post);
  });

  router.get("/", async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
  });

  router.delete("/:id", verifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    if (post.userId !== req.user.uid) return res.status(403).send("Not allowed");
    await post.deleteOne();
    res.sendStatus(204);
  });

  router.post("/:id/comment", verifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");

    post.comments.push({ text: req.body.text, userId: req.user.uid });
    await post.save();
    res.send(post);
  });

  router.delete("/:postId/comment/:commentId", verifyToken, async (req, res) => {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send("Post not found");

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).send("Comment not found");
    if (comment.userId !== req.user.uid) return res.status(403).send("Not allowed");

    comment.deleteOne();
    await post.save();
    res.sendStatus(204);
  });

  router.post("/:id/report", verifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");

    if (!post.reports.includes(req.user.uid)) {
      post.reports.push(req.user.uid);
      await post.save();
    }

    res.sendStatus(200);
  });

  return router;
};
