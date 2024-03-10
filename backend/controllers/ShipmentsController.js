const Shipment = require("./../models/shipments");

// Logs a new shipment
async function logShipment(req, res) {
  const {
    sourceID,
    userID,
    destinationID,
    departureDate,
    arrivalDate,
    status,
  } = req.body;

  try {
    const newShipment = new Shipment(
      shipmentID = null,
      sourceID,
      userID,
      destinationID,
      departureDate,
      arrivalDate,
      status
    );
    const result = await newShipment.save();
    res.status(200).json({
      message: "Shipment logged successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error logging shipment:", error);
    res.status(500).json({ error: "Database error occurred." });
  }
}

// Get status and details of a particular shipment
async function getShipment(req, res) {
  try {
    const shipment = await Shipment.findByID(req.params.id);
    if (shipment) {
      res.status(200).json({
        message: `Shipment id ${req.params.id} retrieved successfully`,
        data: shipment,
      });
    } else {
      res.status(404).json({
        error: `Shipment with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Get all shipments
async function getAllShipments(req, res) {
  try {
    const shipments = await Shipment.findAll();
    res.status(200).json({
      message: "Shipments retrieved successfully",
      data: shipments,
    });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Update a shipment
async function updateShipment(req, res) {
  const updateData = {};
  const allowedUpdates = [
    "sourceID",
    "destinationID",
    "departureDate",
    "arrivalDate",
    "status",
  ];

  // Collect fields to update
  for (const field of allowedUpdates) {
    if (req.body.hasOwnProperty(field)) {
      updateData[field] = req.body[field];
    }
  }

  try {
    const shipmentUpdated = await Shipment.updateShipment(
      req.params.id,
      updateData
    );
    if (shipmentUpdated) {
      res.status(200).json({
        message: `Shipment id ${req.params.id} updated successfully`,
        // Ok I want the return data to call getShipment
        data: await Shipment.findByID(req.params.id),
      });
    } else {
      res
        .status(404)
        .json({ error: `Shipment with id ${req.params.id} not found` });
    }
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "Database error occurred." });
  }
}

// Delete a shipment
async function deleteShipment(req, res) {
  try {
    const shipment = await Shipment.findByID(req.params.id);
    if (shipment) {
      await Shipment.delete(req.params.id);
      res.status(200).json({
        message: `Shipment id ${req.params.id} deleted successfully`,
      });
    } else {
      res.status(404).json({
        error: `Shipment with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

module.exports = {
  logShipment,
  getShipment,
  getAllShipments,
  updateShipment,
  deleteShipment,
};
