require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Import routes
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use("/images", express.static("upload/images"));

// Routes
app.use("/", productRouter); // Prefix all product routes with /api/products
app.use("/", userRouter); // Prefix all user routes with /api/users
app.use("/",orderRouter); // Prefix all order routes with /api/orders
// Basic route
app.get("/", (req, res) => {
  res.send("Express App is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
