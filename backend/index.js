require("dotenv").config();
const PORT = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection with the DB is succesful");
  })
  .catch((error) => {
    console.log(error);
  });

//API creation
app.get("/", (req, res) => {
  res.send("Express App is running");
});
//Image Storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    ),
});

const upload = multer({ storage: storage });

//Creating Upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});

const Product = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
});

// Add this right after your Product model definition

// Search endpoint
app.get("/api/search", async (req, res) => {
  try {
    const searchTerm = req.query.q;
    
    if (!searchTerm || searchTerm.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "Search term must be at least 2 characters"
      });
    }

    const results = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ]
    }).limit(10);

    res.json({
      success: true,
      products: results
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: "Error processing search request"
    });
  }
});

// Suggestions endpoint
app.get("/api/search/suggestions", async (req, res) => {
  try {
    const searchTerm = req.query.q;
    
    if (!searchTerm || searchTerm.trim().length < 2) {
      return res.json({
        success: true,
        suggestions: []
      });
    }

    const suggestions = await Product.find(
      { name: { $regex: `^${searchTerm}`, $options: 'i' } },
      { id: 1, name: 1, image: 1, category: 1, new_price: 1 }
    ).limit(5);

    res.json({
      success: true,
      suggestions: suggestions
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      error: "Error fetching suggestions"
    });
  }
});

//Add product

app.post("/addproduct", async (req, res) => {
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
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({ success: true, name: req.body.name });
});

app.post("/removeProduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.json(products);
});

//Schema Creation for user model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  spent: {
    type: Number,
    default: 0,
  },
});

//Creating the endpoint for creating the users
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username || req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token, name: user.name });
});

//Creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token, name: user.name });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email" });
  }
});

//Creating endpoint for new-connection data

app.get("/newcollections", async (req, res) => {
  let product = await Product.find({});
  let newcollections = product.slice(1).slice(-8);
  newcollections.reverse(); // Reverse the order to show the latest products first
  console.log("NewCollection fetched");
  res.send(newcollections);
});

//creating endpoint for popular in women
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularinwomen = products.slice(0, 4);
  console.log("popular in women fetched");
  res.send(popularinwomen);
});

//Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "please authenticate using a valid token" });
    }
  }
};

//Creating enpoint for adding products in cartData
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

// Creating endpoint to remove product from cartData
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Removed");
  }
});

//Creating endpoint to get cartData

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Get a single product by id
app.get("/product/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid product id" });
  const product = await Product.findOne({ id });
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on PORT ${PORT}`);
  } else {
    console.log(`Error: ${error}`);
  }
});

app.post("/modifyProduct", async (req, res) => {
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
});
