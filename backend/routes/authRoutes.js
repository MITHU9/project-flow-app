import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  getAllUsers,
} from "../controllers/authControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", protect, getAllUsers);
router.get("/me", protect, getProfile);

export default router;
