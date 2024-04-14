const db = require("../config/dbConfig");

class Shipment {
  /**
   * Constructs a Shipment instance with detailed information.
   *
   * @param {object} row - An object containing all shipment properties.
   */
  constructor(row) {
    this.ShipmentID = row.ShipmentID;
    this.SourceID = row.SourceID;
    this.UserID = row.UserID;
    this.DestinationID = row.DestinationID;
    this.DepartureDate = row.DepartureDate;
    this.ArrivalDate = row.ArrivalDate;
    this.Status = row.Status;
  }

  /**
   * Saves the current shipment instance to the database.
   *
   * @return {Promise<object>} The result object from the database operation.
   */
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

  /**
   * Finds a shipment by its unique identifier.
   *
   * @param {number} ShipmentID - The unique identifier of the shipment to find.
   * @return {Promise<Shipment|null>} The found shipment as a Shipment instance, or null if not found.
   */
  static async findByID(ShipmentID) {
    // cast ShipmentID to int
    ShipmentID = parseInt(ShipmentID);
    const query = `SELECT * FROM Shipments WHERE ShipmentID = ?`;
    try {
      const [rows] = await db.pool.query(query, [ShipmentID]);
      if (rows.length > 0) {
        return new Shipment(rows[0]);
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error finding the shipment: " + error.message);
    }
  }

  /**
   * Retrieves all shipments associated with a specific business ID by joining the Shipments table with the Users table.
   * This method assumes that the relationship between users and shipments is established through the UserID,
   * and that each user is linked to a business via the BusinessID.
   *
   * @param {number} businessId - The unique identifier for the business whose shipments are to be retrieved.
   * @returns {Promise<Array<Shipment>>} An array of Shipment instances, each representing a shipment associated with the given business ID.
   * @throws {Error} If an error occurs during the database query execution.
   */
  static async findByBusinessId(businessId) {
    const query = `
      SELECT s.*
      FROM Shipments s
      LEFT JOIN Users u ON u.UserID = s.UserID
      WHERE u.BusinessID = ?;
    `;
    try {
      const [rows] = await db.pool.query(query, [businessId]);
      return rows.map((row) => new Shipment(row));
    } catch (error) {
      throw new Error(
        "Error finding shipments by business ID: " + error.message,
      );
    }
  }

  /**
   * Retrieves all shipments from the database.
   *
   * @return {Promise<Array<Shipment>>} An array of all Shipment instances.
   */
  static async findAll() {
    const query = `SELECT * FROM Shipments`;
    try {
      const [rows] = await db.pool.query(query);
      return rows.map((row) => new Shipment(row));
    } catch (error) {
      throw new Error("Error retrieving shipments: " + error.message);
    }
  }

  /**
   * Updates specified details of a shipment by its unique identifier.
   *
   * @param {number} ShipmentID - The unique identifier of the shipment to update.
   * @param {object} updateData - An object containing the shipment attributes to update.
   * @return {Promise<boolean>} True if the update was successful, false otherwise.
   */
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

  /**
   * Deletes a shipment from the database by its unique identifier, along with any associated shipment details.
   *
   * This method first deletes all entries in the ShipmentDetails table that are associated with the specified ShipmentID.
   * After successfully removing these details, it proceeds to delete the shipment itself from the Shipments table.
   * The operations are performed in a transaction to ensure data integrity - if any step fails, the transaction is rolled back.
   *
   * @param {number} ShipmentID - The unique identifier of the shipment to delete.
   * @return {Promise<object>} The result object from the database operation, indicating the outcome of the deletion.
   * @throws {Error} If an error occurs during the deletion process, including issues with deleting shipment details or the shipment itself.
   */
  static async delete(ShipmentID) {
    const connection = await db.pool.getConnection();

    try {
      await connection.beginTransaction();

      await connection.query(
        "DELETE FROM ShipmentDetails WHERE ShipmentID = ?",
        [ShipmentID],
      );

      const [result] = await connection.query(
        "DELETE FROM Shipments WHERE ShipmentID = ?",
        [ShipmentID],
      );

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw new Error(
        "Error deleting shipment and its details: " + error.message,
      );
    } finally {
      connection.release();
    }
  }
}

module.exports = Shipment;
