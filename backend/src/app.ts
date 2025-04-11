const express = require("express");
import type { Request, Response } from "express";
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/auth", authRoutes);
app.route("/").get((req: Request, res: Response) => {
  res.json({ message: "Hii" });
});
app.use(errorHandler);

module.exports = app;
