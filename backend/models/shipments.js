const db = require("../config/dbConfig");

class Shipment {
  constructor(
    shipmentID,
    sourceID,
    userID,
    destinationID,
    departureDate,
    arrivalDate,
    status,
  ) {
    this.shipmentID = shipmentID;
    this.sourceID = sourceID;
    this.userID = userID;
    this.destinationID = destinationID;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.status = status;
  }

  // Save instance to database
  async save() {
    const query = `
            INSERT INTO Shipments 
            (ShipmentID, SourceID, UserID, DestinationID, DepartureDate, ArrivalDate, Status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [
      this.shipmentID,
      this.sourceID,
      this.userID,
      this.destinationID,
      this.departureDate,
      this.arrivalDate,
      this.status,
    ];

    try {
      const [result] = await db.pool.query(query, values);
      return result;
    } catch (error) {
      throw new Error("Error saving the shipment: " + error.message);
    }
  }

  // Static method to find a shipment by ID
  static async findByID(shipmentID) {
    const query = `SELECT * FROM Shipments WHERE ShipmentID = ?`;
    try {
      const [rows] = await db.pool.query(query, [shipmentID]);
      if (rows.length > 0) {
        const row = rows[0];
        return new Shipment(
          row.ShipmentID,
          row.SourceID,
          row.UserID,
          row.DestinationID,
          row.DepartureDate,
          row.ArrivalDate,
          row.Status,
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error finding the shipment: " + error.message);
    }
  }

  // Static method to retrieve all shipments
  static async findAll() {
    const query = `SELECT * FROM Shipments`;
    try {
      const [rows] = await db.pool.query(query);
      return rows.map(
        (row) =>
          new Shipment(
            row.ShipmentID,
            row.SourceID,
            row.UserID,
            row.DestinationID,
            row.DepartureDate,
            row.ArrivalDate,
            row.Status,
          ),
      );
    } catch (error) {
      throw new Error("Error retrieving shipments: " + error.message);
    }
  }

  // Static method to update a shipment status
  static async updateStatus(shipmentID, newStatus) {
    const query = `UPDATE Shipments SET Status = ? WHERE ShipmentID = ?`;
    try {
      const [result] = await db.pool.query(query, [newStatus, shipmentID]);
      return result;
    } catch (error) {
      throw new Error("Error updating shipment status: " + error.message);
    }
  }
}

module.exports = Shipment;
