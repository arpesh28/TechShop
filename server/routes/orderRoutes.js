import express from "express";
import {
  createOrder,
  getOrders,
  deleteOrder,
  setDelivered,
} from "../controllers/orderController.js";
import { protectRoute, admin } from "../middleware/auth.js";
const router = express.Router();

//  Customer Routes
router.post("/", protectRoute, createOrder);

// Admin Routes
router.get("/", protectRoute, admin, getOrders);
router.delete("/:id", protectRoute, admin, deleteOrder);
router.put("/:id", protectRoute, admin, setDelivered);

export default router;
