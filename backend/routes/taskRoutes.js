import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  toggleSubTask,
  updateTask,
} from "../controllers/taskControllers.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/", protect, upload, createTask);
router.patch("/subtask/:subTaskId/toggle", protect, toggleSubTask);

router.get("/:id", protect, getTaskById);
router.get("/:boardId", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

// //Drag and drop
// router.put("/move/:taskId", protect, moveTask);

export default router;
