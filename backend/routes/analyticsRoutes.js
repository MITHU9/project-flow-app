import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getTaskStats,
  getUserPerformance,
} from "../controllers/analyticsController";

const router = express.Router();

router.get("/stats", protect, getTaskStats);
router.get("/performance", protect, getUserPerformance);

export default router;
