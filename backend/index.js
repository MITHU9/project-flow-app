import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongo } from "./config/dbMongo.js";
import { connectSQL } from "./config/dbSQL.js";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { createServer } from "http";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/errorHandler.js";
import { moveTaskSocket } from "./sockets/taskSockets.js";

const app = express();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Error handler
app.use(errorHandler);

// DB connections
connectMongo();
connectSQL();

// Socket.IO setup
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] },
});

// Socket connection
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // Listen for drag-and-drop events
  socket.on("task:move", async (data) => {
    await moveTaskSocket(io, data); // pass io to broadcast
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
