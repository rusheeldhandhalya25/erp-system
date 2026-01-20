const express = require('express');
const cors =require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);

app.get("/",(req,res) => { 
    res.send("erp backend is working ..");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`server is running on this ${PORT}`);
});