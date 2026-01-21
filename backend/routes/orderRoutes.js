const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");

// POST order (WITH STOCK VALIDATION + AUTO MINUS)
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 1️⃣ fetch product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ stock validation
    if (quantity > product.stock) {
      return res
        .status(400)
        .json({ message: "Not enough stock available" });
    }

    // 3️⃣ create order
    const order = await Order.create({
      productId: product._id,
      productName: product.name,
      quantity,
      price: product.price,
      total: product.price * quantity,
    });

    // 4️⃣ auto minus stock
    product.stock = product.stock - quantity;
    await product.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
