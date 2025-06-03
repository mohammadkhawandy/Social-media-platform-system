const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const handleId = require("../middlewares/handleid.middlewares");
const auth = require("../middlewares/auth.middlewares");
const verifyToken = require("../middlewares/verifyToken.middlewares");

//routers
router.get("/me", [auth], postController.getMe);
router.post("/", postController.addOne);
router.put("/:id", [verifyToken], [handleId], postController.updateOne);
router.delete("/:id", [verifyToken], [handleId], postController.deleteOne);
router.get("/", postController.getAll);
router.get("/:id", [handleId], postController.getOne);

module.exports = router;
