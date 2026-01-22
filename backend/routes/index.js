const express = require("express");

const authRoutes = require("./authRoutes"); 
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");
const router = require("./adminRoutes");

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
  
