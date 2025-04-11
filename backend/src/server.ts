import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

console.log("Starting server...");

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
