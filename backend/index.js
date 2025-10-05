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
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);


const frontendPath = path.join(__dirname, "../frontend/build");
const adminPath = path.join(__dirname, "../admin/dist"); // or ../admin/build depending on your tool

// Serve frontend
app.use("/app", express.static(frontendPath));
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Serve admin
app.use("/admin", express.static(adminPath));
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

// Basic route
app.get("/", (req, res) => {
  res.send("Express App is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
