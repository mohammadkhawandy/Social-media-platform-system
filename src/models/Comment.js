const mongoose = require("mongoose");

const Comment = new mongoose.model(
  "Comment",
  mongoose.Schema(
    {
      content: {
        type: String,
        required: true,
      },
      _authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      _postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    },
    { timestamps: true }
  )
);
module.exports = Comment;
