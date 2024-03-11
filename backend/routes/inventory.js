const express = require("express");
const router = express.Router();
const inventoryController = require('../controllers/InventoryController');
const db = require("../config/dbConfig");



// Endpoint to create new item in the inventory
router.post("/", inventoryController.createItem);

// Endpoint to get a particular item in the inventory
router.get("/:id", inventoryController.getInventory);

// Endpoint for getting all items in the inventory
router.get("/", inventoryController.getAllItems);

// // Endpoint to update an item in the inventory
// router.patch("/:id", inventoryController.updateShipment);

// // Endpoint to delete an item in the inventory
// router.delete("/:id", inventoryController.deleteShipment);

// (MAYBE) HIDDEN ENDPOINT to view all products in the Products table
router.get("/products", inventoryController.getAllProducts);

// (MAYBE) HIDDEN ENDPOINT to view all locations in the Locations table
router.get("/locations", inventoryController.getAllLocations);


module.exports = router;
