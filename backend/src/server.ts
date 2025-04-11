import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

console.log("Starting server...");

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
