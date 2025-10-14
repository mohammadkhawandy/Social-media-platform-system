const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const handleId = require("../middlewares/handleid.middlewares");
const verifyToken = require("../middlewares/verifyToken.middlewares");

//routers
router.post("/", commentController.addOne);
router.get("/:postId", commentController.getOne);
router.delete("/:id", [verifyToken], [handleId], commentController.deleteOne);
router.delete("/", commentController.deleteMany);

module.exports = router;
