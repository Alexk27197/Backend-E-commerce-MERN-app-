import express from "express";
import { connectDb } from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import categoryRotes from "./routes/categoryRoutes.js";
dotenv.config();

connectDb();

const app = express();
//middleware
app.use(cors());
app.use(express.json({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRotes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const PORT = process.env.PORT || 4446;

app.listen(PORT, () => {
  console.log(`Server Runnig on Port http://localhost:${PORT} !`);
});
