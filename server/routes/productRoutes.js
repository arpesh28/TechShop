import express from "express";
import {
  getProductDetails,
  getProducts,
  createProductReview,
  createProduct,
  deleteProduct,
  updateProduct,
  removeProductReview,
} from "../controllers/productController.js";
import { protectRoute, admin } from "../middleware/auth.js";

const router = express.Router();

//  Customer End Routes
router.get("/", getProducts); //  GET Products List
router.get("/:id", getProductDetails); // GET Product Details
router.post("/reviews/:id", protectRoute, createProductReview); //  Add Product review

//  Admin routes
router.post("/", protectRoute, admin, createProduct);
router.delete("/:id", protectRoute, admin, deleteProduct);
router.put("/", protectRoute, admin, updateProduct);
router.put("/:productId/:reviewId", protectRoute, admin, removeProductReview);

export default router;
