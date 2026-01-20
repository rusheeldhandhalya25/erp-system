const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/signup",async (req,res) =>{
    try{
        const{ name ,email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"All feild are required "
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        //creating a new user ..

        res.status(201).json({
            message:" User created successfully ..",
            user
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;