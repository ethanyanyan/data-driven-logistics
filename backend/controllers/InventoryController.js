/**
 * InventoryController.js
 * This controller handles all inventory-related operations, including
 * creating, retrieving (all and by inventoryId), updating and deleting inventory,
 */

const InventoryLevel = require("./../models/InventoryLevel");
const db = require("../config/dbConfig");

// Logs a new Item in the inventory
async function createItem(req, res) {
  const { LocationID, ProductID, Quantity } = req.body;

  try {
    const newInventory = new InventoryLevel(
      (InventoryLevelID = null),
      LocationID,
      ProductID,
      Quantity
    );
    const result = await newInventory.save();
    res.status(200).json({
      message: "Item logged successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: "Database error occurred." });
  }
}

// Get status and details of a particular item
async function getInventory(req, res) {
  try {
    const item = await InventoryLevel.findByID(req.params.id);
    if (item) {
      res.status(200).json({
        message: `Inventory id ${req.params.id} retrieved successfully`,
        data: item,
      });
    } else {
      res.status(404).json({
        error: `Inventory with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Get all Inventory
async function getAllItems(req, res) {
  try {
    const allItems = await InventoryLevel.findAll();
    res.status(200).json({
      message: "Items retrieved successfully",
      data: allItems,
    });
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Update an Inventory quantity
async function updateQuantity(req, res) {
  const newQuantity = req.body.Quantity;
  try {
    const inventory = await InventoryLevel.findByID(req.params.id);
    if (inventory) {
      const updated = await inventory.adjustQuantity(newQuantity);
      if (updated) {
        res.status(200).json({
          message: `Quantity for inventory id ${req.params.id} updated successfully`,
          data: await InventoryLevel.findByID(req.params.id),
        });
      } else {
        res.status(500).json({
          error: "Error updating the inventory level quantity",
        });
      }
    } else {
      res.status(404).json({
        error: `Inventory with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Update a Inventory details
async function updateInventory(req, res) {
  const updateData = {};
  const allowedUpdates = ["LocationID", "ProductID", "Quantity"];

  // Collect fields to update
  for (const field of allowedUpdates) {
    if (req.body.hasOwnProperty(field)) {
      updateData[field] = req.body[field];
    }
  }
  try {
    const inventoryUpdated = await InventoryLevel.update(
      req.params.id,
      updateData
    );
    if (inventoryUpdated) {
      res.status(200).json({
        message: `InventoryLevel id ${req.params.id} updated successfully`,
        data: await InventoryLevel.findByID(req.params.id),
      });
    } else {
      res
        .status(404)
        .json({ error: `InventoryLevel with id ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error occurred." });
  }
}

// Delete an inventory
async function deleteInventory(req, res) {
  try {
    const inventory = await InventoryLevel.findByID(req.params.id);
    if (inventory) {
      await InventoryLevel.delete(req.params.id);
      res.status(200).json({
        message: `InventoryLevel id ${req.params.id} deleted successfully`,
      });
    } else {
      res.status(404).json({
        error: `InventoryLevel with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Temp route for testing
async function getAllProducts(req, res) {
  try {
    const [results] = await db.pool.query("SELECT * FROM Products");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Database error occurred." });
  }
}

// Temp route for testing
async function getAllLocations(req, res) {
  try {
    const [results] = await db.pool.query("SELECT * FROM Locations");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Database error occurred." });
  }
}

module.exports = {
  createItem,
  getAllProducts,
  getAllLocations,
  getAllItems,
  getInventory,
  deleteInventory,
  updateInventory,
  updateQuantity,
};
