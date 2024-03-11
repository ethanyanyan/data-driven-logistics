const Items = require("./../models/inventory");
const db = require("../config/dbConfig");

// Logs a new Item in the inventory
async function createItem(req, res) {
  const { LocationID, ProductID, Quantity } = req.body;

  try {
    const newItems = new Items(
      (InventoryLevelID = null),
      LocationID,
      ProductID,
      Quantity
    );
    const result = await newItems.save();
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
    const item = await Items.findByID(req.params.id);
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

// Get all shipments
async function getAllItems(req, res) {
  try {
    const allItems = await Items.findAll();
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

// // Update a shipment
// async function updateShipment(req, res) {
//   const updateData = {};
//   const allowedUpdates = [
//     "SourceID",
//     "DestinationID",
//     "DepartureDate",
//     "ArrivalDate",
//     "Status",
//   ];

//   // Collect fields to update
//   for (const field of allowedUpdates) {
//     if (req.body.hasOwnProperty(field)) {
//       updateData[field] = req.body[field];
//     }
//   }

//   try {
//     const shipmentUpdated = await Shipment.updateShipment(
//       req.params.id,
//       updateData
//     );
//     if (shipmentUpdated) {
//       res.status(200).json({
//         message: `Shipment id ${req.params.id} updated successfully`,
//         // Ok I want the return data to call getShipment
//         data: await Shipment.findByID(req.params.id),
//       });
//     } else {
//       res
//         .status(404)
//         .json({ error: `Shipment with id ${req.params.id} not found` });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Database error occurred." });
//   }
// }

// // Delete a shipment
// async function deleteShipment(req, res) {
//   try {
//     const shipment = await Shipment.findByID(req.params.id);
//     if (shipment) {
//       await Shipment.delete(req.params.id);
//       res.status(200).json({
//         message: `Shipment id ${req.params.id} deleted successfully`,
//       });
//     } else {
//       res.status(404).json({
//         error: `Shipment with id ${req.params.id} not found`,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: "Database error occurred.",
//     });
//   }
// }

async function getAllProducts(req, res) {
  try {
    const [results] = await db.pool.query("SELECT * FROM Products");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Database error occurred." });
  }
}

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
};
