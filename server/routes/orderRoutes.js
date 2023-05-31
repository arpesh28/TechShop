import express from "express";
import { createOrder } from "../controllers/orderController.js";
import protectRoute from "../middleware/auth.js";
const router = express.Router();

//  Routes
router.post("/", protectRoute, createOrder);

export default router;
