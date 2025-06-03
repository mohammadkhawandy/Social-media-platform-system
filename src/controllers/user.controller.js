const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
//create Token
const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY);
};
class userController {
  //Create an account
  signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Enter all data" });
      }
      const isEmail = await User.findOne({ email });
      if (isEmail) {
        return res
          .status(400)
          .json({ message: "your email is already exist:" });
      }
      if (typeof username !== "string") {
        return res.status(400).json({ message: "the username is not string:" });
      }
      if (typeof email !== "string") {
        return res.status(400).json({ message: "the email is not string:" });
      }
      if (typeof password !== "string") {
        return res.status(400).json({ message: "the password is not string:" });
      }
      function isValidEmail(emmail) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        return emailPattern.test(emmail);
      }
      const checkEmail = isValidEmail(email);
      if (!checkEmail) {
        return res.status(400).json({ message: "the email is wrong:" });
      }

      const hashPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        timeCost: 3,
        memoryCost: 4096,
        parallelism: 1,
      });
      const user = await User.create({
        username,
        email,
        password: hashPassword,
      });
      const token = createToken({ id: user._id, email: user.email });
      return res.status(200).json({
        message: "sign up successfully",
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
  //Log in to the account
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Enter all data" });
      }
      const isEmail = await User.findOne({ email });
      if (!isEmail) {
        return res.status(400).json({ message: "your email is not exist:" });
      }
      if (typeof email !== "string") {
        return res.status(400).json({ message: "the email is not string:" });
      }
      if (typeof password !== "string") {
        return res.status(400).json({ message: "the password is not string:" });
      }
      function isValidEmail(emmail) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        return emailPattern.test(emmail);
      }
      const checkEmail = isValidEmail(email);
      if (!checkEmail) {
        return res.status(400).json({ message: "the email is wrong:" });
      }

      if (!(await argon2.verify(isEmail.password, password))) {
        return res.status(400).json({ message: "the data is wrong:" });
      }

      const token = createToken({ id: isEmail._id, email: isEmail.email });
      return res.status(200).json({
        message: "sign up successfully",
        data: {
          user: isEmail,
          token,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
  //Log out of the account
  logout = async (req, res) => {
    try {
      return res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
  //Edit account
  edit = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const id = req.id;
      let useer = await User.findById(id);
      username = username || useer.username;
      email = email || useer.email;
      password = password || useer.password;
      if (!username) {
        return res.status(400).json({ message: "Enter a new username" });
      }
      const isEmail = await User.findOne({ email });
      if (isEmail) {
        return res.status(400).json({ message: "The email already exists." });
      }
      if (!email) {
        return res.status(400).json({ message: "Enter a new email" });
      }
      if (!password) {
        return res.status(400).json({ message: "Enter a new password" });
      }
      if (typeof username !== "string") {
        return res.status(400).json({ message: "the username is not string:" });
      }
      if (typeof email !== "string") {
        return res.status(400).json({ message: "the email is not string:" });
      }
      if (typeof password !== "string") {
        return res.status(400).json({ message: "the password is not string:" });
      }
      function isValidEmail(emmail) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        return emailPattern.test(emmail);
      }
      const checkEmail = isValidEmail(email);
      if (!checkEmail) {
        return res.status(400).json({ message: "the email is wrong:" });
      }

      const hashPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        timeCost: 3,
        memoryCost: 4096,
        parallelism: 1,
      });
      const user = await User.findByIdAndUpdate(
        id,
        { username, email, password: hashPassword },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Update successfully", data: user });
    } catch (error) {
      return res.status(500).json({ message: "error", message: error.message });
    }
  };
  // delete account
  deleteUser = async (req, res) => {
    try {
      const id = req.id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(200).json({ message: "User is not found" });
      }
      await Comment.deleteMany({ _authorId: id });
      const userPosts = await Post.find({ _authorId: id });
      const postIds = userPosts.map((post) => post._id);
      await Comment.deleteMany({ _postId: { $in: postIds } });
      await Post.deleteMany({ _authorId: id });
      const data = await User.findByIdAndDelete(id);

      return res.status(200).json({ message: "Delete successfully", data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  //Get data user
  getDataUser = async (req, res) => {
    try {
      const id = req.id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ message: "the user is not found" });
      }
      return res.status(200).json({ message: "get The Profile:", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}
module.exports = new userController();
