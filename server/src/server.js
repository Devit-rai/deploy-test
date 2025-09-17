import bodyParser from "body-parser";
import express from "express";
import multer from "multer";
import cors from "cors";
import cookieParser from "cookie-parser";

import auth from "./middleware/auth.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import config from "./config/config.js";
import connectCloudinary from "./config/cloudinary.js";
import { connectDB } from "./config/db.js";
import logger from "./middleware/logger.js";

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

connectDB();
connectCloudinary();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    version: config.version,
    status: "OK",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", upload.array("photos", 10), vehicleRoutes);
app.use("/api/booking", auth, bookingRoutes);

app.listen(config.port, () => {
  console.log(
    `${config.name} v${config.version} running on http://localhost:${config.port} [${config.nodeEnv}]`
  );
});
