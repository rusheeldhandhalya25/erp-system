const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const routes = require("./routes/index");

require("dotenv").config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("erp backend is working ..");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on this ${PORT}`);
});
