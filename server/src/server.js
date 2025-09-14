import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import logger from "./middleware/logger.js";
import connectCloudinary from "./config/cloudinary.js";
import bodyParser from "body-parser";
import multer from "multer";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();

const upload = multer({ storage: multer.memoryStorage() });
connectCloudinary();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", upload.array("photos", 10), vehicleRoutes);
app.use("/api/booking", auth, bookingRoutes);

app.get("/", (req, res) => {
  res.json({
    name: process.env.NAME,
    version: process.env.VERSION,
    message: "Server is running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `${process.env.NAME} v${process.env.VERSION} running on http://localhost:${PORT} [${process.env.NODE_ENV}]`
      );
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};

startServer();
