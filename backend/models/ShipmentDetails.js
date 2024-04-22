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
    this.ProductID = row.ItemID;
    this.Quantity = row.Quantity;
  }

  /**
   * Saves the current shipmentDetail instance to the database.
   *
   * @return {Promise<object>} The result object from the database operation.
   */
  async save() {
    const query = `
            INSERT INTO ShipmentDetails 
            (ShipmentDetailID, ShipmentID, ProductID, Quantity) 
            VALUES (?, ?, ?, ?)
        `;
    const values = [
      this.ShipmentDetailID,
      this.ShipmentID,
      this.ProductID,
      this.Quantity,
    ];

    try {
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
static async findByShipmentID (ShipmentID) {
    const query = `SELECT * FROM ShipmentDetails WHERE ShipmentID = ?`;
  
    try {
      const [rows] = await db.pool.query(query, [ShipmentID]);
      return rows.map((row) => new ShipmentDetails(row));
    } catch (error) {
      throw new Error("Error finding shipmentDetails: " + error.message);
    }
  };
}



module.exports = ShipmentDetails;
