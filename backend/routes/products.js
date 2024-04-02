const express = require("express");
const router = express.Router();
const productController = require('../controllers/ProductsController');
const db = require("../config/dbConfig");



// Endpoint to create new product
router.post("/", productController.createProduct);

// Endpoint to get a particular product
router.get("/:id", productController.getProduct);

// Endpoint for getting all products
router.get("/", productController.getAllProducts);

// Endpoint to update the unit price pf a product
router.patch("/:id", productController.updateDetails);

// // Endpoint to update the description of a product
// routerß.put("/:id", productController.updateDescription);

// // Endpoint to delete a product
// router.delete("/:id", productController.deleteInventory);

module.exports = router;
