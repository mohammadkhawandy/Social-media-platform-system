const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares");
//routers
router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.put("/me", [auth], userController.edit);

router.post("/logout", [auth], userController.logout);

router.delete("/me", [auth], userController.deleteUser);

router.get("/me", [auth], userController.getDataUser);

module.exports = router;
