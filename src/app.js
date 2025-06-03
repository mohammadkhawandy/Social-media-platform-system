const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());

//routes
const postruter = require("./routes/post.route");
const commentruter = require("./routes/comment.route");
const userruter = require("./routes/user.route");

app.use("/api/posts", postruter);
app.use("/api/comments", commentruter);
app.use("/api/users", userruter);

module.exports = app;
