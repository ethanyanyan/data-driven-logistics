const Shipment = require("../models/Shipments");
const ShipmentDetails = require("../models/ShipmentDetails");

// Logs a new shipment
async function logShipment(req, res) {
  const {
    SourceID,
    UserID,
    DestinationID,
    DepartureDate,
    ArrivalDate,
    Status,
  } = req.body;

  try {
    const shipmentData = {
      SourceID,
      UserID,
      DestinationID,
      DepartureDate,
      ArrivalDate,
      Status,
    };

    const newShipment = new Shipment(shipmentData);
    const result = await newShipment.save();

    res.status(200).json({
      message: "Shipment logged successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database error occurred: " + error.message });
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
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Get all shipments by business ID
async function getShipmentsByBusinessId(req, res) {
  try {
    const businessId = req.params.businessId;
    const shipments = await Shipment.findByBusinessId(businessId);
    if (shipments.length > 0) {
      res.status(200).json({
        message: `Shipments for business id ${businessId} retrieved successfully`,
        data: shipments,
      });
    } else {
      res
        .status(404)
        .json({ error: `No shipments found for business id ${businessId}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error occurred." });
  }
}

// Update a shipment
async function updateShipment(req, res) {
  const updateData = {};
  const allowedUpdates = [
    "SourceID",
    "DestinationID",
    "DepartureDate",
    "ArrivalDate",
    "Status",
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
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

async function logShipmentDetails(req, res) {
  const ShipmentID  = req.params.id;
  const { ProductID, Quantity } = req.body
  try {
    const shipmentDetailsData = {
      ShipmentID,
      ProductID,
      Quantity,
    };

    const newShipmentDetails = new ShipmentDetails(shipmentDetailsData);
    const result = await newShipmentDetails.save();

    res.status(200).json({
      message: "Shipment details logged successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database error occurred: " + error.message });
  }
}

async function getShipmentDetails(req, res) {
  try {
    const shipmentDetails = await ShipmentDetails.findByShipmentID(
      req.params.id
    );
    if (shipmentDetails) {
      res.status(200).json({
        message: `Shipment details for shipment id ${req.params.id} retrieved successfully`,
        data: shipmentDetails,
      });
    } else {
      res.status(404).json({
        error: `Shipment details for shipment id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

module.exports = {
  logShipment,
  getShipment,
  getAllShipments,
  getShipmentsByBusinessId,
  updateShipment,
  deleteShipment,
  logShipmentDetails,
  getShipmentDetails,
};
