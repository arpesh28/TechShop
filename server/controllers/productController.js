import Product from "../models/Product.js";
import mongoose from "mongoose";

const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

export { getProducts };
