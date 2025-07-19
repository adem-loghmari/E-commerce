const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const upload = require("../config/multer");

router.post("/upload",upload.single("product"),productController.uploadImage);
router.get("/allproducts", productController.getAllProducts);
router.post("/addproduct", productController.addProduct);
router.post("/removeproduct", productController.deleteProduct);
router.get("/product/:id", productController.getSingleProduct);
router.post("/modifyProduct", productController.modifyProduct);
router.get("/newcollections", productController.getNewCollections);
router.get("/popularinwomen", productController.getPopularWomen);
router.get("/api/search", productController.searchProducts);
router.get("/api/search/suggestions", productController.searchSuggestions);
router.get("/getTotalProducts", productController.getTotalProducts);

module.exports = router;
