import Product from "../models/Product.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

//  Customer Controllers
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

//  Admin Controllers
const createProduct = asyncHandler(async (req, res) => {
  const {
    brand,
    name,
    category,
    stock,
    price,
    image,
    productIsNew,
    description,
  } = req.body;
  const newProduct = await Product.create({
    brand,
    name,
    category,
    price,
    image: "/images/" + image,
    productIsNew,
    description,
    stock,
  });
  await newProduct.save();
  const products = await Product.find({});
  if (newProduct) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product could not be uploaded.");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    brand,
    name,
    image,
    category,
    stock,
    price,
    id,
    productIsNew,
    description,
    numberOfReviews,
  } = req.body;
  const product = await Product.findById(id);
  if (product) {
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.image = "/images/" + image;
    product.price = price;
    product.description = description;
    product.stock = stock;
    product.productIsNew = productIsNew;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductDetails,
  createProductReview,
  createProduct,
  deleteProduct,
  updateProduct,
};
