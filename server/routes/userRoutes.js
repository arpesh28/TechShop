import express from "express";

import {
  loginUser,
  registerUser,
  updateUserProfile,
  getUserOrders,
} from "../controllers/userController.js";

import protectRoute from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.put("/profile/:id", protectRoute, updateUserProfile);
router.get("/:id", protectRoute, getUserOrders);

export default router;
