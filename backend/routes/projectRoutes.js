import express from "express";
import {
  addMember,
  createProject,
  getProjects,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.post("/add-member", protect, addMember);

export default router;
