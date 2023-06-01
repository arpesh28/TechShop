import express from "express";
import {
  getProductDetails,
  getProducts,
  createProductReview,
} from "../controllers/productController.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

//  GET all products
router.get("/", getProducts);
//  GET product details by id
router.get("/:id", getProductDetails);
//  POST product review
router.post("/reviews/:id", protectRoute, createProductReview);

export default router;
