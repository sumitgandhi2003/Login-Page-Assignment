import express from "express";
import {
  handleUserLogin,
  handleUserRegister,
} from "../controller/auth.controller.js";

const router = express.Router();
router.post("/login", handleUserLogin);
router.post("/register", handleUserRegister);

export default router;
