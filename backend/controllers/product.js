const Product = require("../models/ProductModel");
const { isNonEmptyString, isPositiveInt, escapeRegex } = require("../utils/validate");

const CATEGORIES = ["women", "men", "kid"];

// Reads the editable product fields from a request body. Returns { error } on bad input.
// With partial = true, missing fields are skipped instead of rejected.
const readProductFields = (body, partial = false) => {
  const fields = {};
  const has = (key) => body[key] !== undefined && body[key] !== "";

  if (has("name")) {
    if (!isNonEmptyString(body.name, 150)) return { error: "Invalid product name" };
    fields.name = body.name.trim();
  } else if (!partial) return { error: "Product name is required" };

  if (has("image")) {
    // Only images served by this app (uploaded through /api/upload) are accepted.
    if (typeof body.image !== "string" || !/^\/images\/[\w.-]+$/.test(body.image)) {
      return { error: "Invalid product image" };
    }
    fields.image = body.image;
  } else if (!partial) return { error: "Product image is required" };

  if (has("category")) {
    if (!CATEGORIES.includes(body.category)) return { error: "Invalid category" };
    fields.category = body.category;
  } else if (!partial) return { error: "Category is required" };

  for (const key of ["new_price", "old_price"]) {
    if (has(key)) {
      const price = Number(body[key]);
      if (!Number.isFinite(price) || price < 0 || price > 1000000) return { error: "Invalid price" };
      fields[key] = price;
    } else if (!partial) return { error: "Both prices are required" };
  }

  for (const key of ["stock", "sold"]) {
    if (has(key)) {
      const amount = Number(body[key]);
      if (!Number.isInteger(amount) || amount < 0) return { error: `Invalid ${key} value` };
      fields[key] = amount;
    }
  }
  return { fields };
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { fields, error } = readProductFields(req.body);
    if (error) return res.status(400).json({ success: false, error });

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({ id, ...fields, sold: 0 });
    await product.save();
    res.json({ success: true, name: product.name });
  } catch {
    res.status(500).json({ success: false, error: "Failed to add product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.body.id);
    if (!isPositiveInt(id)) return res.status(400).json({ success: false, error: "Product id required" });
    const deleted = await Product.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, error: "Product not found" });
    res.json({ success: true, id });
  } catch {
    res.status(500).json({ success: false, error: "Failed to delete product" });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: 0, error: "No image uploaded" });
    res.json({ success: 1, image_url: `/images/${req.file.filename}` });
  } catch {
    res.status(500).json({ success: 0, error: "Image upload failed" });
  }
};

const modifyProduct = async (req, res) => {
  const id = Number(req.body.id);
  if (!isPositiveInt(id)) return res.status(400).json({ success: false, error: "Product id required" });

  const { fields, error } = readProductFields(req.body, true);
  if (error) return res.status(400).json({ success: false, error });

  try {
    const updated = await Product.findOneAndUpdate({ id }, { $set: fields }, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: "Product not found" });
    res.json({ success: true, product: updated });
  } catch {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid product id" });
    const product = await Product.findOne({ id });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch {
    res.status(500).json({ error: "Error fetching product" });
  }
};

const getNewCollections = async (req, res) => {
  try {
    const products = await Product.find({});
    const newcollections = products.slice(1).slice(-8).reverse();
    res.json(newcollections);
  } catch {
    res.status(500).json({ error: "Error fetching new collections" });
  }
};

const getPopularWomen = async (req, res) => {
  try {
    const products = await Product.find({ category: "women" });
    res.json(products.slice(0, 4));
  } catch {
    res.status(500).json({ error: "Error fetching popular products" });
  }
};

const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (typeof searchTerm !== "string" || searchTerm.trim().length < 2 || searchTerm.length > 100) {
      return res.status(400).json({ success: false, error: "Search term must be at least 2 characters" });
    }
    const results = await Product.find({
      $or: [
        { name: { $regex: escapeRegex(searchTerm.trim()), $options: "i" } },
        { category: { $regex: escapeRegex(searchTerm.trim()), $options: "i" } },
      ],
    }).limit(10);
    res.json({ success: true, products: results });
  } catch {
    res.status(500).json({ success: false, error: "Error processing search request" });
  }
};

const searchSuggestions = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (typeof searchTerm !== "string" || searchTerm.trim().length < 2 || searchTerm.length > 100) {
      return res.json({ success: true, suggestions: [] });
    }
    const suggestions = await Product.find(
      { name: { $regex: `^${escapeRegex(searchTerm.trim())}`, $options: "i" } },
      { id: 1, name: 1, image: 1, category: 1, new_price: 1 }
    ).limit(5);
    res.json({ success: true, suggestions });
  } catch {
    res.status(500).json({ success: false, error: "Error fetching suggestions" });
  }
};

const getTotalProducts = async (req, res) => {
  try {
    const total = await Product.countDocuments();
    res.json({ total });
  } catch {
    res.status(500).json({ error: "Failed to fetch total products" });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  modifyProduct,
  getSingleProduct,
  getNewCollections,
  getPopularWomen,
  searchProducts,
  searchSuggestions,
  uploadImage,
  getTotalProducts,
};
