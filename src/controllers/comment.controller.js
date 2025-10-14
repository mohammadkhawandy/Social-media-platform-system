const Comment = require("../models/Comment");
const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");
class commentController {
  // To add a comment
  addOne = async (req, res) => {
    try {
      const { content, authorId, postId } = req.body;
      if (!content) {
        return res
          .status(400)
          .json({ message: "the content is not found:", data: null });
      }
      if (!authorId) {
        return res
          .status(400)
          .json({ message: "the authorId is not found:", data: null });
      }
      if (!postId) {
        return res
          .status(400)
          .json({ message: "the postId is not found:", data: null });
      }
      if (typeof content !== "string") {
        return res
          .status(400)
          .json({ message: "the content is not string:", data: null });
      }
      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        return res
          .status(400)
          .json({ message: "Invalid authorId ", data: null });
      }
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid postId ", data: null });
      }
      const isautherId = await User.findById(authorId);
      if (!isautherId) {
        return res
          .status(400)
          .json({ message: "not found author", data: null });
      }
      const ispostId = await Post.findById(postId);
      if (!ispostId) {
        return res.status(400).json({ message: "not found post", data: null });
      }
      const comment = await Comment.create({
        content,
        _authorId: authorId,
        _postId: postId,
      });
      return res
        .status(200)
        .json({ message: "Comment written", data: comment });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
  // To Get a comment
  getOne = async (req, res) => {
    try {
      const postId = req.params.postId;

      const comments = await Comment.find({ _postId: postId });
      if (!comments) {
        return res
          .status(400)
          .json({ message: "The comments is not found", data: null });
      }
      if (comments.length == 0) {
        return res
          .status(400)
          .json({ message: "Comments on this post are empty", data: null });
      }
      return res
        .status(200)
        .json({ message: "The Comments on this post ", data: comments });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
  // To delete a comment
  deleteOne = async (req, res) => {
    try {
      const commentId = req.id;
      const userId = req.user.id;

      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res
          .status(404)
          .json({ message: "Comment not found", data: null });
      }

      if (comment._authorId.toString() !== userId) {
        return res.status(403).json({
          message: "You are not authorized to delete this comment",
          data: null,
        });
      }

      const deleted = await Comment.findByIdAndDelete(commentId);

      return res.status(200).json({
        message: "Comment deleted successfully",
        data: deleted,
      });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };

  deleteMany = async (req, res) => {
    try {
      await Comment.deleteMany({});
      return res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
}
module.exports = new commentController();
