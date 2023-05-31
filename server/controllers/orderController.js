import Order from "../models/Order.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    paymentDetails,
    userInfo,
  } = req.body;
  if (orderItems?.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: userInfo?._id,
      username: userInfo?.username,
      email: userInfo?.email,
      shippingAddress,
      paymentDetails,
      paymentMethod,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export { createOrder };
