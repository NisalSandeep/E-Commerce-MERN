import express from "express";
import dotenv from "dotenv";
import dns from "dns";
import cookieParser from "cookie-parser";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRoutes );
app.use("/api/products",productRoutes );
app.use("/api/cart",cartRoutes );

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  connectDb();
});
