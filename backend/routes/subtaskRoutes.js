import express from "express";
import {
  createSubtask,
  getSubtasks,
  updateSubtask,
  deleteSubtask,
} from "../controllers/subtaskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSubtask);
router.get("/:taskId", protect, getSubtasks);
router.put("/:id", protect, updateSubtask);
router.delete("/:id", protect, deleteSubtask);

export default router;
