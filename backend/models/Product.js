const db = require("../config/dbConfig");

class Product {
  constructor(ProductID, Name, Description, UnitPrice) {
    this.ProductID = ProductID;
    this.Name = Name;
    this.Description = Description;
    this.UnitPrice = UnitPrice;
  }

  /**
   * Saves a new product to the database.
   *
   * @return {Promise<object>} The result object from the database operation.
   */
  async save() {
    const query = `
            INSERT INTO Products (Name, Description, UnitPrice) 
            VALUES (?, ?, ?)
        `;
    const values = [this.Name, this.Description, this.UnitPrice];

    try {
      const [result] = await db.pool.query(query, values);
      this.ProductID = result.insertId; // Since auto_increment is used for ProductID
      return result;
    } catch (error) {
      throw new Error("Error saving the product: " + error.message);
    }
  }

  /**
   * Finds a product by its unique identifier.
   *
   * @param {number} ProductID - The unique identifier of the product to find.
   * @return {Promise<Product|null>} The found product as a Product instance, or null if not found.
   */
  static async findByID(ProductID) {
    const query = `SELECT * FROM Products WHERE ProductID = ?`;

    try {
      const [rows] = await db.pool.query(query, [ProductID]);
      if (rows.length > 0) {
        return new Product(
          rows[0].ProductID,
          rows[0].Name,
          rows[0].Description,
          rows[0].UnitPrice,
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error finding the product: " + error.message);
    }
  }

  /**
   * Retrieves all products from the database.
   * @return {Promise<Product[]>} An array of Product instances representing all products in the database.  
   * @throws {Error} If an error occurs while retrieving the products.
   */
  static async getAll() {
    const query = `SELECT * FROM Products`;

    try {
      const [rows] = await db.pool.query(query);
      return rows.map(
        (row) =>
          new Product(row.ProductID, row.Name, row.Description, row.UnitPrice),
      );
    } catch (error) {
      throw new Error("Error retrieving products: " + error.message);
    }
  }

  /**
   * Updates specified details of a product by its unique identifier.
   *
   * @param {object} updateData - An object containing the product attributes to update.
   * @return {Promise<boolean>} True if the update was successful, false otherwise.
   */
  async update(updateData) {
    let query = "UPDATE Products SET ";
    const queryParams = [];
    Object.entries(updateData).forEach(([key, value], index) => {
      query += `${key} = ?`;
      queryParams.push(value);
      if (index < Object.entries(updateData).length - 1) query += ", ";
    });
    query += " WHERE ProductID = ?";
    queryParams.push(this.ProductID);

    try {
      const [result] = await db.pool.query(query, queryParams);
      Object.assign(this, updateData); // Update current instance properties
      return result.changedRows > 0;
    } catch (error) {
      throw new Error("Error updating product: " + error.message);
    }
  }

  /**
   * Deletes a product from the database by its unique identifier, along with any associated records in ShipmentDetails and InventoryLevels.
   *
   * This method first deletes all entries in the ShipmentDetails and InventoryLevels tables that are associated with the specified ProductID.
   * After successfully removing these related records, it proceeds to delete the product itself from the Products table.
   * The operations are wrapped in a transaction to ensure data integrity - if any step fails, the transaction is rolled back,
   * keeping the database in a consistent state.
   *
   * @return {Promise<object>} The result object from the database operation, indicating the outcome of the deletion.
   * @throws {Error} If an error occurs during the deletion process, including issues with deleting related records or the product itself.
   */
  async delete() {
    const connection = await db.pool.getConnection();

    try {
      await connection.beginTransaction();

      await connection.query(
        "DELETE FROM ShipmentDetails WHERE ProductID = ?",
        [this.ProductID],
      );

      await connection.query(
        "DELETE FROM InventoryLevels WHERE ProductID = ?",
        [this.ProductID],
      );

      const [result] = await connection.query(
        "DELETE FROM Products WHERE ProductID = ?",
        [this.ProductID],
      );

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback(); // Roll back the transaction on error
      throw new Error(
        "Error deleting product and its related records: " + error.message,
      );
    } finally {
      connection.release();
    }
  }

  // Additional methods as needed for product management
}

module.exports = Product;
