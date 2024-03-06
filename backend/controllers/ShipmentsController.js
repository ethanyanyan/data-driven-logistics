const db = require("../config/dbConfig");

// Logs a new shipments
async function logShipment(req, res) {
  const { SourceID, DestinationID, DepartureDate, ArrivalDate, Status } = req.body;
  const connection = await db.getConnection();
  try {
    // Insert the new shipment into the database
    const [result] = await connection.query(
      "INSERT INTO Shipments (SourceID, DestinationID, DepartureDate, ArrivalDate, Status) VALUES (?, ?, ?, ?, ?)",
      [SourceID, DestinationID, DepartureDate, ArrivalDate, Status]
    );
    console.log("Shipment logged successfully", result);
    res.status(200).json({
      message: "Shipment logged successfully",
      data: { ShipmentId: result.insertId, ...req.body }
    });
  } catch (error) {
    // Handle database errors gracefully
    console.error("Database error: ", error);
    return res.status(500).json({ 
      error: "Database error occurred." 
    });
  } finally {
    // Release connection back to pool
    if (connection) {
      connection.release();
    }
  }
}

// Get staus and details of a particular shipment
async function getShipment(req, res) {
  const id = req.params.id;
  const connection = await db.getConnection();
  try {
    // Retrieve the shipment with the given id from the database for a particular user
    const [rows] = await connection.query("SELECT * FROM Shipments WHERE ShipmentID = ?", [id]);
    if (rows.length > 0) {
      res.status(200).json({
        message: `Shipment id ${id} retrieved successfully`,
        data: rows[0]
      });
    } else {
      res.status(404).json({ 
        error: `Shipment with id ${id} not found` 
      });
    }
  } catch (error) {
    // Handle database errors gracefully
    console.error("Database error: ", error);
    return res.status(500).json({ 
      error: "Database error occurred." 
    });
  } finally {
    // Release connection back to pool
    if (connection) {
      connection.release();
    }
  }
}

// Get all shipments for a particular user
async function getAllShipments(req, res) {
  const connection = await db.getConnection();
  try {
    // Retrieve all shipments from the database
    const [rows] = await connection.query("SELECT * FROM Shipments");
    console.log("Shipments retrieved successfully", rows);
    res.status(200).json({
      message: "Shipments retrieved successfully",
      data: rows
    });
  } catch (error) {
    // Handle database errors gracefully
    console.error("Database error: ", error);
    return res.status(500).json({ 
      error: "Database error occurred." 
    });
  } finally {
    // Release connection back to pool
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {logShipment, getShipment, getAllShipments};
