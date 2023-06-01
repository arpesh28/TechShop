import express from "express";

import {
  loginUser,
  registerUser,
  updateUserProfile,
  getUserOrders,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";

import { protectRoute, admin } from "../middleware/auth.js";

const router = express.Router();

//  Customer Routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.put("/profile/:id", protectRoute, updateUserProfile);
router.get("/:id", protectRoute, getUserOrders);

//  Admin Routes
router.get("/", protectRoute, admin, getUsers);
router.delete("/:id", protectRoute, admin, deleteUser);

export default router;
