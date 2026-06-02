const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const upload = require("../config/multer");
const adminAuth = require("../middleware/adminAuth");

router.post("/upload", adminAuth, upload.single("product"), productController.uploadImage);
router.get("/allproducts", productController.getAllProducts);
router.post("/addproduct", adminAuth, productController.addProduct);
router.post("/removeproduct", adminAuth, productController.deleteProduct);
router.get("/product/:id", productController.getSingleProduct);
router.post("/modifyProduct", adminAuth, productController.modifyProduct);
router.get("/newcollections", productController.getNewCollections);
router.get("/popularinwomen", productController.getPopularWomen);
router.get("/search", productController.searchProducts);
router.get("/search/suggestions", productController.searchSuggestions);
router.get("/getTotalProducts", productController.getTotalProducts);

module.exports = router;
