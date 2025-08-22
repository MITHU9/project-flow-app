import express from "express";
import {
  createProject,
  getProjects,
  getProjectById as getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
