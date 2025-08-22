import express from "express";
import {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBoard);
router.get("/:projectId", protect, getBoards);
router.put("/:id", protect, updateBoard);
router.delete("/:id", protect, deleteBoard);

export default router;
