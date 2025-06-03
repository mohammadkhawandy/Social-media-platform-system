let Post = require("../models/Post");
let User = require("../models/User");
let Comment = require("../models/Comment");
const mongoose = require("mongoose");
class postscontroller {
  //add post
  addOne = async (req, res) => {
    try {
      const { title, content, authorId, likes, commentsId } = req.body;
      if (!title) {
        return res
          .status(400)
          .json({ message: "the title is not found:", data: null });
      }
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
      if (!likes) {
        return res
          .status(400)
          .json({ message: "the likes is not found:", data: null });
      }
      if (typeof title !== "string") {
        return res
          .status(400)
          .json({ message: "the title is not string:", data: null });
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
      if (typeof likes !== "number") {
        return res
          .status(400)
          .json({ message: "the likes is not number:", data: null });
      }
      if (!authorId || !mongoose.Types.ObjectId.isValid(authorId)) {
        return res
          .status(400)
          .json({ message: "Invalid or missing authorId", data: null });
      }

      const isautherId = await User.findById(authorId);
      if (!isautherId) {
        return res
          .status(400)
          .json({ message: "not found author", data: null });
      }
      let comment = null;
      if (commentsId) {
        if (!mongoose.Types.ObjectId.isValid(commentsId)) {
          return res
            .status(400)
            .json({ message: "Invalid commentsId", data: null });
        }

        const commentExists = await Comment.findById(commentsId);
        if (!commentExists) {
          return res
            .status(400)
            .json({ message: "Comment not found", data: null });
        }

        comment = commentsId;
      }
      const createe = await Post.create({
        title,
        content,
        likes,
        _authorId: authorId,
        comments: comment,
      });
      return res.status(200).json({ message: "Post created", data: createe });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
  //Edit post
  updateOne = async (req, res) => {
    try {
      const postId = req.id;
      const userId = req.user.id;

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post._authorId.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this post" });
      }

      let { title, content, likes, commentsId } = req.body;

      title = title || post.title;
      content = content || post.content;
      likes = likes || post.likes;
      let comment = post.comments;

      if (commentsId) {
        if (!mongoose.Types.ObjectId.isValid(commentsId)) {
          return res.status(400).json({ message: "Invalid commentsId" });
        }
        const commentExists = await Comment.findById(commentsId);
        if (!commentExists) {
          return res.status(400).json({ message: "Comment not found" });
        }
        comment = commentsId;
      }

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, content, likes, comments: comment },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Post updated successfully", data: updatedPost });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  //delete post
  deleteOne = async (req, res) => {
    try {
      const postId = req.id;
      const userId = req.user.id;

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post._authorId.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this post" });
      }

      await Comment.deleteMany({ _postId: postId });
      const deletedPost = await Post.findByIdAndDelete(postId);

      return res
        .status(200)
        .json({ message: "Post deleted successfully", data: deletedPost });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  //Get all posts
  getAll = async (req, res) => {
    try {
      const posts = await Post.find({}).populate("_authorId comments");
      return res.status(200).json({ message: "The all posts:", posts });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
  //Get post by id
  getOne = async (req, res) => {
    try {
      const id = req.id;
      const post = await Post.findById(id).populate("_authorId comments");
      if (!post) {
        return res.status(400).json({ message: "the post is not found" });
      }
      return res.status(200).json({ message: "get The post:", post });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
  //get posts the user
  getMe = async (req, res) => {
    try {
      const id = req.id;

      const post = await Post.find({ _authorId: id });
      return res.status(200).json({ message: "get The posts:", post });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
}
module.exports = new postscontroller();
