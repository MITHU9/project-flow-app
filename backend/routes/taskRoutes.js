import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/:boardId", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
