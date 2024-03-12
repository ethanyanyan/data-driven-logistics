const db = require("../config/dbConfig");

class InventoryLevel {
  constructor(inventoryLevelID, locationID, productID, quantity) {
    this.InventoryLevelID = inventoryLevelID;
    this.LocationID = locationID;
    this.ProductID = productID;
    this.Quantity = quantity;
  }

  /**
   * Saves a new inventory level to the database.
   *
   * @return {Promise<object>} The result object from the database operation.
   */
  async save() {
    const query = `
            INSERT INTO InventoryLevels (LocationID, ProductID, Quantity) 
            VALUES (?, ?, ?)
        `;
    const values = [this.LocationID, this.ProductID, this.Quantity];

    try {
      const [result] = await db.pool.query(query, values);
      this.InventoryLevelID = result.insertId; // Since auto_increment is used for InventoryLevelID
      return result;
    } catch (error) {
      throw new Error("Error saving the inventory level: " + error.message);
    }
  }

  /**
   * Updates the quantity of an inventory level.
   *
   * @param {number} newQuantity - The new quantity to update.
   * @return {Promise<boolean>} True if the update was successful, false otherwise.
   */
  async updateQuantity(newQuantity) {
    const query = `
            UPDATE InventoryLevels 
            SET Quantity = ? 
            WHERE InventoryLevelID = ?
        `;
    const values = [newQuantity, this.InventoryLevelID];

    try {
      const [result] = await db.pool.query(query, values);
      if (result.changedRows > 0) {
        this.Quantity = newQuantity; // Update the instance's quantity
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(
        "Error updating the inventory level quantity: " + error.message,
      );
    }
  }

  /**
   * Finds inventory levels by location and product.
   *
   * @param {number} locationID - The identifier for the location.
   * @param {number} productID - The identifier for the product.
   * @return {Promise<InventoryLevel|null>} The found inventory level as an InventoryLevel instance, or null if not found.
   */
  static async findByLocationAndProduct(locationID, productID) {
    const query = `
            SELECT * FROM InventoryLevels 
            WHERE LocationID = ? AND ProductID = ?
        `;
    const values = [locationID, productID];

    try {
      const [rows] = await db.pool.query(query, values);
      if (rows.length > 0) {
        return new InventoryLevel(
          rows[0].InventoryLevelID,
          rows[0].LocationID,
          rows[0].ProductID,
          rows[0].Quantity,
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error finding the inventory level: " + error.message);
    }
  }

  /**
   * Adjusts the quantity of an inventory level by a specified amount.
   * The amount can be positive (to add to the inventory) or negative
   * (to subtract from the inventory), ensuring the final quantity
   * does not drop below zero.
   *
   * @param {number} amount - The amount to adjust the quantity by.
   * @return {Promise<boolean>} True if the adjustment was successful, false otherwise.
   */
  async adjustQuantity(amount) {
    // Calculate the new quantity, ensuring it doesn't fall below zero
    const newQuantity = Math.max(this.Quantity + amount, 0);

    const query = `
            UPDATE InventoryLevels 
            SET Quantity = ? 
            WHERE InventoryLevelID = ?
        `;
    const values = [newQuantity, this.InventoryLevelID];

    try {
      const [result] = await db.pool.query(query, values);
      if (result.changedRows > 0) {
        this.Quantity = newQuantity; // Update the instance's quantity
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(
        "Error adjusting the inventory level quantity: " + error.message,
      );
    }
  }

  // Additional methods as needed for inventory level management
}

module.exports = InventoryLevel;
