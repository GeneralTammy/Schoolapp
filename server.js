import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Route imports
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";

// Load environment variables from a .env file

const app = express();
// Use environment variables for Port and Mongo URI
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/schooldb";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_URL, // Use ENV variable
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

mongoose
  // 2. Use MONGO_URI variable and remove deprecated options
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    // Best practice to exit on critical DB failure
    process.exit(1);
  });

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

// 3. 404 Error Handler: Runs if no route above matched
app.use((req, res, next) => {
  res.status(404).json({ message: "API Endpoint Not Found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:3000`);
});
