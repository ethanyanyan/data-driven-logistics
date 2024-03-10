const db = require("../config/dbConfig");

class Shipment {
  constructor(
    ShipmentID,
    SourceID,
    UserID,
    DestinationID,
    DepartureDate,
    ArrivalDate,
    Status,
  ) {
    this.ShipmentID = ShipmentID;
    this.SourceID = SourceID;
    this.UserID = UserID;
    this.DestinationID = DestinationID;
    this.DepartureDate = DepartureDate;
    this.ArrivalDate = ArrivalDate;
    this.Status = Status;
  }

  // Save instance to database
  async save() {
    const query = `
            INSERT INTO Shipments 
            (ShipmentID, SourceID, DestinationID, DepartureDate, ArrivalDate, Status, UserID) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [
      this.ShipmentID,
      this.SourceID,
      this.DestinationID,
      this.DepartureDate,
      this.ArrivalDate,
      this.Status,
      this.UserID,
    ];

    try {
      const [result] = await db.pool.query(query, values);
      return result;
    } catch (error) {
      throw new Error("Error saving the shipment: " + error.message);
    }
  }

  // Static method to find a shipment by ID
  static async findByID(ShipmentID) {
    // cast ShipmentID to int
    ShipmentID = parseInt(ShipmentID);
    const query = `SELECT * FROM Shipments WHERE ShipmentID = ?`;
    try {
      const [rows] = await db.pool.query(query, [ShipmentID]);
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

  // Static method to update a shipment Status
  static async updateShipment(ShipmentID, updateData) {
    let query = "UPDATE Shipments SET ";
    const queryParams = [];
    let isFirst = true;

    // Construct query dynamically based on the fields in updateData
    for (const [key, value] of Object.entries(updateData)) {
      if (!isFirst) query += ", ";
      query += `${key} = ?`;
      queryParams.push(value);
      isFirst = false;
    }
    query += " WHERE ShipmentID = ?";
    // typecast ShipmentID to int
    ShipmentID = parseInt(ShipmentID);
    queryParams.push(ShipmentID);

    try {
      const [result] = await db.pool.query(query, queryParams);
      return result.changedRows > 0;
    } catch (error) {
      throw new Error("Error updating shipment: " + error.message);
    }
  }

  static async delete(ShipmentID) {
    const query = `DELETE FROM Shipments WHERE ShipmentID = ?`;
    try {
      const [result] = await db.pool.query(query, [ShipmentID]);
      return result;
    } catch (error) {
      throw new Error("Error deleting shipment: " + error.message);
    }
  }
}

module.exports = Shipment;