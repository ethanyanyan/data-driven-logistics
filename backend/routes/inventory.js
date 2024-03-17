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

// Endpoint to update the quantity of an item in the inventory
router.put("/:id", inventoryController.updateQuantity);

// Endpoint to update an item in the inventory
router.patch("/:id", inventoryController.updateInventory);

// Endpoint to delete an item in the inventory
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;
