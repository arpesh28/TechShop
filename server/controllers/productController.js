import Product from "../models/Product.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

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

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, title } = req.body;
  const product = await Product.findById(req.params.id);
  const user = await User.findById(userId);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r, i) => r.user.toString() === user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    };
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review has been saved." });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductDetails, createProductReview };
