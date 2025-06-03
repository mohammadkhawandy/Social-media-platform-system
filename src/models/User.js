const mongoose = require("mongoose");

const User = new mongoose.model(
  "User",
  mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);
module.exports = User;
