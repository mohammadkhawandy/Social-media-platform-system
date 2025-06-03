const jwt = require("jsonwebtoken");
const User = require("../models/User");
//User verification using token
const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(400)
        .json({ message: "Authorization must be required" });
    }
    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(data?.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    req.id = data.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ err: "Token expired", expiredAt: error.expiredAt });
    }
    return res.status(500).json({ message: message.error });
  }
};
module.exports = auth;
