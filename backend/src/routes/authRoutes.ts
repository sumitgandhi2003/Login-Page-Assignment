// const express = require("express");
const express = require("express");
const router = express().router;
const authController = require("../controller/auth.controller");
router.route("/login").post(authController.handleUserLogin);
router.route("/register").post(authController.handleUserRegister);

module.exports = router;
