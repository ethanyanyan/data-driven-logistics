const Shipment = require("./../models/shipments");

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
    const newShipment = new Shipment(
      null,
      SourceID,
      UserID,
      DestinationID,
      DepartureDate,
      ArrivalDate,
      Status,
    );
    const result = await newShipment.save();
    res.status(200).json({
      message: "Shipment logged successfully",
      data: { ShipmentId: result.insertId, ...req.body },
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
    console.log("Shipments retrieved successfully", shipments);
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

module.exports = { logShipment, getShipment, getAllShipments };
