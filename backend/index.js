require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");
const connectDB = require("./config/db");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const adminRouter = require("./routes/admin");

// Refuse to start with a missing configuration instead of failing on the first request.
const REQUIRED_ENV = ["MONGODB_URI", "JWT_SECRET", "ADMIN_USERNAME", "ADMIN_PASSWORD_HASH"];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 4000;


// The app runs behind a reverse proxy in production; needed for correct client IPs in rate limiting.
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        // MUI (Emotion) injects style tags at runtime.
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
  })
);
app.use(cors({ origin: process.env.CORS_ORIGIN || false }));
app.use(compression());
app.use(express.json({ limit: "100kb" }));

// Static uploads
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// API routes
app.use("/api", adminRouter);
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);

// Unknown API routes return JSON instead of falling through to the SPA's index.html.
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, error: "Not found" });
});

// ─── Admin panel ───────────────────────────────────────────────────────────────
const adminPath = path.join(__dirname, "../admin/dist");

// Serve Vite-built static assets (JS, CSS, images…).
// express.static already handles /admin → /admin/ redirect internally,
// so no explicit redirect needed (adding one causes a redirect loop).
app.use("/admin", express.static(adminPath));

// SPA fallback: any /admin/* path that is not a real file (e.g. /admin/orders
// on a hard refresh) gets index.html so React Router handles it client-side.
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

// Central error handler: malformed JSON, oversized or rejected uploads, and anything unexpected.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, error: "Invalid JSON" });
  }
  if (err.type === "entity.too.large" || err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ success: false, error: "File or request is too large (max 5MB for images)" });
  }
  if (err.status === 400 || err.name === "MulterError") {
    return res.status(400).json({ success: false, error: err.message });
  }
  console.error(err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

// Accept requests only once the database is reachable (connectDB exits the process on failure).
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
