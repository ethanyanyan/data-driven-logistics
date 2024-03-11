const db = require("../config/dbConfig");

class Items {
  constructor(InventoryLevelID, LocationID, ProductID, Quantity) {
    this.InventoryLevelID = InventoryLevelID;
    this.LocationID = LocationID;
    this.ProductID = ProductID;
    this.Quantity = Quantity;
  }

  // Save instance to database
  async save() {
    const query = `
            INSERT INTO InventoryLevels
            (InventoryLevelID, LocationID, ProductID, Quantity) 
            VALUES (?, ?, ?, ?)
        `;
    const values = [
      this.InventoryLevelID,
      this.LocationID,
      this.ProductID,
      this.Quantity,
    ];

    try {
      const [result] = await db.pool.query(query, values);
      return result;
    } catch (error) {
      throw new Error("Error saving the item(s): " + error.message);
    }
  }

  // Static method to find a shipment by ID
  static async findByID(InventoryID) {
    // cast ShipmentID to int
    InventoryID = parseInt(InventoryID);
    const query = `SELECT * FROM InventoryLevels WHERE InventoryLevelID = ?`;
    try {
      const [rows] = await db.pool.query(query, [InventoryID]);
      if (rows.length > 0) {
        const row = rows[0];
        return new Items(
          row.InventoryLevelID,
          row.LocationID,
          row.ProductID,
          row.Quantity
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error finding the Item: " + error.message);
    }
  }

  // Static method to retrieve all shipments
  static async findAll() {
    const query = `SELECT * FROM InventoryLevels`;
    try {
      const [rows] = await db.pool.query(query);
      return rows.map(
        (row) =>
          new Items(
            row.InventoryLevelID,
            row.LocationID,
            row.ProductID,
            row.Quantity
          )
      );
    } catch (error) {
      throw new Error("Error retrieving all items: " + error.message);
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

module.exports = Items;
