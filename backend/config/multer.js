const multer = require("multer");
const path = require("path");

const ALLOWED_TYPES = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../upload/images"),
  // The extension comes from the validated MIME type, never from the client's file name.
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}_${Date.now()}${ALLOWED_TYPES[file.mimetype]}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES[file.mimetype]) return cb(null, true);
    const error = new Error("Only PNG, JPG or WEBP images are allowed");
    error.status = 400;
    cb(error);
  },
});

module.exports = upload;
