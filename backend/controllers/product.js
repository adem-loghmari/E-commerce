const Product = require("../models/ProductModel");
const PORT = process.env.PORT || 4000;

// Get all products with /allproducts
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

//Add product with /addproduct
const addProduct = async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    stock: req.body.stock,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({ success: true, name: req.body.name });
};

// Delete product with /deleteproduct

const deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
};
//upload product image with /upload
const uploadImage = async (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
};

// Update product with /modifyproduct
const modifyProduct = async (req, res) => {
  const { id, ...fields } = req.body;
  if (!id)
    return res
      .status(400)
      .json({ success: false, error: "Product id required" });

  // Remove undefined fields so only changed fields are updated
  Object.keys(fields).forEach((key) => {
    if (fields[key] === undefined || fields[key] === "") delete fields[key];
  });

  try {
    const updated = await Product.findOneAndUpdate(
      { id: Number(id) },
      { $set: fields },
      { new: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

//get single product by /product/:id
const getSingleProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid product id" });
  const product = await Product.findOne({ id });
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

//new collection
const getNewCollections = async (req, res) => {
  let product = await Product.find({});
  let newcollections = product.slice(1).slice(-8);
  newcollections.reverse(); // Reverse the order to show the latest products first
  console.log("NewCollection fetched");
  res.send(newcollections);
};

// popular in women
const getPopularWomen = async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularinwomen = products.slice(0, 4);
  console.log("popular in women fetched");
  res.send(popularinwomen);
};

//search products by name with /api/search
const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm || searchTerm.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "Search term must be at least 2 characters",
      });
    }

    const results = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    }).limit(10);

    res.json({
      success: true,
      products: results,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      error: "Error processing search request",
    });
  }
};

// Suggestions endpoint with /api/search/suggestions
const searchSuggestions = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm || searchTerm.trim().length < 2) {
      return res.json({
        success: true,
        suggestions: [],
      });
    }

    const suggestions = await Product.find(
      { name: { $regex: `^${searchTerm}`, $options: "i" } },
      { id: 1, name: 1, image: 1, category: 1, new_price: 1 }
    ).limit(5);

    res.json({
      success: true,
      suggestions: suggestions,
    });
  } catch (error) {
    console.error("Suggestions error:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching suggestions",
    });
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
};
