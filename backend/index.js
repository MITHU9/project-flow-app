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
export let io;
const server = createServer(app);
io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] },
});

// Socket connection
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // Join a personal room
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their personal room`);
  });

  // ✅ Join a task room (new)
  socket.on("joinTask", (taskId) => {
    socket.join(taskId);
    console.log(`User joined task room: ${taskId}`);
  });

  // Join board rooms for realtime updates
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
  });

  // Listen for drag-and-drop events
  socket.on("task:move", async (data) => {
    await moveTaskSocket(io, data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
