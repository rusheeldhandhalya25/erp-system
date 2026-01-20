const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/erpdb");
        console.log("mongo connect");;
    }
    catch(error){
        console.log("mongo error ...",error.message);
    }
};

module.exports = connectDB;