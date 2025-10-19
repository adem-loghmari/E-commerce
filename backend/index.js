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

// Serve static assets
app.use('/admin', express.static(adminPath));
app.use(express.static(frontendPath));

// Admin client-side routing: always return admin index for /admin/*
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});

// SPA support: for any non-API request, serve the frontend index.html so client-side routing works on refresh.
// Leave API and static routes alone so they can return their proper responses or errors.
app.get('*', (req, res) => {
  // If the request is for the API or images, pass through (these should have been handled above)
  if (req.path.startsWith('/api') || req.path.startsWith('/images')) {
    return res.status(404).json({ error: 'Not Found' });
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
