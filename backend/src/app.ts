import express, { type Request, type Response } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/auth", authRoutes);

app.route("/").get((req: Request, res: Response) => {
  res.json({ message: "Hii" });
});

app.use(errorHandler);

export default app;
