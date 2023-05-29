import Product from "../models/Product.js";
import mongoose from "mongoose";

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

const getProductDetails = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ error: "Product Not Found!" });
  }
  res.status(200).json(product);
};

export { getProducts, getProductDetails };
