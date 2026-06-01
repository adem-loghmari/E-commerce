require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());

// Static uploads
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// API routes
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);

// ─── Admin panel ───────────────────────────────────────────────────────────────
const adminPath = path.join(__dirname, "../admin/dist");

// 1. /admin (no trailing slash) → redirect to /admin/ so the app boots cleanly
app.get("/admin", (req, res) => res.redirect(301, "/admin/"));

// 2. Static assets (JS, CSS, images, etc.) built by Vite under /admin/
app.use("/admin", express.static(adminPath));

// 3. SPA fallback: any /admin/* path that isn't a static file gets index.html
//    so React Router can handle client-side navigation and page refreshes.
app.use("/admin", (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

// ─── Customer frontend (CRA) ───────────────────────────────────────────────────
const frontendPath = path.join(__dirname, "../frontend/build");

app.use(express.static(frontendPath));

// SPA fallback for the customer app — must come last.
// API and image routes are already handled above so they won't reach here.
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
