const Product = require("../models/ProductModel");

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
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      stock: req.body.stock,
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch {
    res.status(500).json({ success: false, error: "Failed to add product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ id: req.body.id });
    if (!deleted) return res.status(404).json({ success: false, error: "Product not found" });
    res.json({ success: true, id: req.body.id });
  } catch {
    res.status(500).json({ success: false, error: "Failed to delete product" });
  }
};

const uploadImage = async (req, res) => {
  try {
    res.json({ success: 1, image_url: `/images/${req.file.filename}` });
  } catch {
    res.status(500).json({ success: 0, error: "Image upload failed" });
  }
};

const modifyProduct = async (req, res) => {
  const { id, ...fields } = req.body;
  if (!id) return res.status(400).json({ success: false, error: "Product id required" });

  Object.keys(fields).forEach((key) => {
    if (fields[key] === undefined || fields[key] === "") delete fields[key];
  });

  try {
    const updated = await Product.findOneAndUpdate(
      { id: Number(id) },
      { $set: fields },
      { new: true }
    );
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
    if (!searchTerm || searchTerm.trim().length < 2) {
      return res.status(400).json({ success: false, error: "Search term must be at least 2 characters" });
    }
    const results = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
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
    if (!searchTerm || searchTerm.trim().length < 2) {
      return res.json({ success: true, suggestions: [] });
    }
    const suggestions = await Product.find(
      { name: { $regex: `^${searchTerm}`, $options: "i" } },
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
