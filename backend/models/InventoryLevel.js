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
        "Error updating the inventory level quantity: " + error.message
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
          rows[0].Quantity
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error finding the inventory level: " + error.message);
    }
  }

  /**
   * Finds all inventory levels in a location.
   * @param {number} locationID - The identifier for the location.
   * @return {Promise<InventoryLevel[]>} An array of InventoryLevel instances.
   */
  static async findByID(InventoryID) {
    // cast ShipmentID to int
    InventoryID = parseInt(InventoryID);
    const query = `SELECT * FROM InventoryLevels WHERE InventoryLevelID = ?`;
    try {
      const [rows] = await db.pool.query(query, [InventoryID]);
      if (rows.length > 0) {
        const row = rows[0];
        return new InventoryLevel(
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

  /**
   * Finds all the inventory levels in the database.
   *
   * @returns {Promise<InventoryLevel[]>} An array of InventoryLevel instances.
   */
  static async findAll() {
    const query = `SELECT * FROM InventoryLevels`;
    try {
      const [rows] = await db.pool.query(query);
      return rows.map(
        (row) =>
          new InventoryLevel(
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
        "Error adjusting the inventory level quantity: " + error.message
      );
    }
  }

  /**
   * Updates an inventory level in the database, given the InventoryLevelID.
   * Only certain paremeters can be updated - LocationID, ProductID, Quantity
   * Checks are done in Controller to ensure only those parameters are part of updateData
   * @param {number} InventoryLevelID - The identifier for the inventory level.
   * @param {object} updateData - An object containing the fields to update and their new values.
   * @return {Promise<boolean>} True if the update was successful, false otherwise.
   */
  static async update(InventoryLevelID, updateData) {
    let query = "UPDATE InventoryLevels SET ";
    const queryParams = [];
    let isFirst = true;
    // Construct query dynamically based on the fields in updateData
    for (const [key, value] of Object.entries(updateData)) {
      if (!isFirst) query += ", ";
      query += `${key} = ?`;
      queryParams.push(value);
      isFirst = false;
    }
    query += " WHERE InventoryLevelID = ?";
    // typecast ShipmentID to int
    InventoryLevelID = parseInt(InventoryLevelID);
    queryParams.push(InventoryLevelID);

    try {
      const [result] = await db.pool.query(query, queryParams);
      return result.changedRows > 0;
    } catch (error) {
      throw new Error("Error updating InventoryLevel: " + error.message);
    }
  }

  /**
   * Deletes an inventory level from the database, given hte InventoryLevelID.
   * TODO?: Delete shipment when inventory is deleted
   * @param {number} InventoryID - The identifier for the inventory level.
   * @return {Promise<boolean>} True if the deletion was successful, false otherwise.
   */
  static async delete(InventoryLevelID) {
    const query = `DELETE FROM InventoryLevels WHERE InventoryLevelID = ?`;
    try {
      const [result] = await db.pool.query(query, InventoryLevelID);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting the inventory level: " + error.message);
    }
  }

  // Additional methods as needed for inventory level management
}

module.exports = InventoryLevel;
