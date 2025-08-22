import express from "express";
import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createComment);
router.get("/:taskId", protect, getComments);
router.delete("/:id", protect, deleteComment);

export default router;
