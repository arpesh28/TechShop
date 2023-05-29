import express from "express";
import {
  getProductDetails,
  getProducts,
} from "../controllers/productController.js";
const router = express.Router();

//  GET all products
router.get("/", getProducts);
//  GET product details by id
router.get("/:id", getProductDetails);

export default router;
