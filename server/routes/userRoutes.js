import express from "express";

import {
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

import protectRoute from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.put("/profile/:id", protectRoute, updateUserProfile);
export default router;
