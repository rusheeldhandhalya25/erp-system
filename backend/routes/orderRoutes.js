const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");

// PLACE ORDER
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const total = product.price * quantity;

    // create order
    const order = await Order.create({
      product: product._id,
      quantity,
      price: product.price,
      total
    });

    // reduce stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
