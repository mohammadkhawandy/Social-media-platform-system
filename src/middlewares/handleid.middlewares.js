const mongoose = require("mongoose");
//Return ID and verify it
const handleId = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    req.id = id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
module.exports = handleId;
