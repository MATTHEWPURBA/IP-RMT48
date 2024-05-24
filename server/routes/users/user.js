const express = require("express");
const UserController = require("../../controllers/UserController");
const router = express.Router();
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/google-login",UserController.googleLogin)
module.exports = router;
