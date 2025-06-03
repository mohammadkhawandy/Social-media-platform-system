const mongoose = require("mongoose");

const Post = new mongoose.model(
  "Post",
  mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      _authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      likes: {
        type: Number,
        required: true,
      },
      comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    },
    { timestamps: true }
  )
);
module.exports = Post;
