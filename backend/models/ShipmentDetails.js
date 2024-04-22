const db = require("../config/dbConfig");

class ShipmentDetails {
  /**
   * Constructs a ShipmentDetails instance with detailed information.
   *
   * @param {object} row - An object containing all shipmentDetail properties.
   */
  constructor(row) {
    this.ShipmentDetailID = row.ShipmentDetailID;
    this.ShipmentID = row.ShipmentID;
    this.ProductID = row.ProductID;
    this.Quantity = row.Quantity;
  }

  /**
   * Saves the current shipmentDetail instance to the database.
   *
   * @return {Promise<object>} The result object from the database operation.
   */
  async save() {
    let query = `
      SELECT * FROM ShipmentDetails 
      WHERE ShipmentID = ? AND ProductID = ?
    `;
    let values = [this.ShipmentID, this.ProductID];

    try {
      const [rows] = await db.pool.query(query, values);

      // If a row with the same ShipmentID and ProductID exists, update it
      if (rows.length > 0) {
        query = `
          UPDATE ShipmentDetails 
          SET Quantity = ?
          WHERE ShipmentID = ? AND ProductID = ?
        `;
        values = [this.Quantity, this.ShipmentID, this.ProductID];
      } else {
        // Otherwise, insert a new row
        query = `
          INSERT INTO ShipmentDetails 
          (ShipmentDetailID, ShipmentID, ProductID, Quantity) 
          VALUES (?, ?, ?, ?)
        `;
        values = [
          this.ShipmentDetailID,
          this.ShipmentID,
          this.ProductID,
          this.Quantity,
        ];
      }

      const [result] = await db.pool.query(query, values);
      return result;
    } catch (error) {
      throw new Error("Error saving the shipmentDetail: " + error.message);
    }
  }

  /**
   * Finds shipmentDetails by their shipment.
   *
   * @param {number} ShipmentID - The shipment ID of shipmentDetails to find.
   * @return {Promise<Array<ShipmentDetails>>} An array of ShipmentDetails instances that match the shipment.
   */
  static async findByShipmentID(ShipmentID) {
    const query = `SELECT * FROM ShipmentDetails WHERE ShipmentID = ?`;

    try {
      const [rows] = await db.pool.query(query, [ShipmentID]);
      return rows.map((row) => new ShipmentDetails(row));
    } catch (error) {
      throw new Error("Error finding shipmentDetails: " + error.message);
    }
  }
}

module.exports = ShipmentDetails;
