const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  userId: String,
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  text: String,
  image: String,
  userId: String,
  username: String,
  comments: [commentSchema],
  reports: [String],
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);