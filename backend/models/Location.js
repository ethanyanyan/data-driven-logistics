const db = require("../config/dbConfig");

class Location {
  constructor(
    LocationID,
    BusinessID,
    TypeID,
    Latitude,
    Longitude,
    LocationName,
  ) {
    this.LocationID = LocationID;
    this.BusinessID = BusinessID;
    this.TypeID = TypeID;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.LocationName = LocationName;
  }

  /**
   * Saves a new location to the database.
   *
   * @return {Promise<object>} The result object from the database operation.
   */
  async save() {
    const query = `
            INSERT INTO Locations (BusinessID, TypeID, Latitude, Longitude, LocationName) 
            VALUES (?, ?, ?, ?)
        `;
    const values = [
      this.BusinessID,
      this.TypeID,
      this.Latitude,
      this.Longitude,
      this.LocationName,
    ];

    try {
      const [result] = await db.pool.query(query, values);
      this.LocationID = result.insertId; // Since auto_increment is used for LocationID
      return result;
    } catch (error) {
      throw new Error("Error saving the location: " + error.message);
    }
  }

  /**
   * Retrieves all locations from the database.
   *
   * @return {Promise<Location[]>} An array of location instances.
   */
  static async findAll() {
    const query = `SELECT * FROM Locations`;

    try {
      const [rows] = await db.pool.query(query);
      return rows.map(
        (row) =>
          new Location(
            row.LocationID,
            row.BusinessID,
            row.TypeID,
            row.Latitude,
            row.Longitude,
            row.LocationName,
          ),
      );
    } catch (error) {
      throw new Error("Error retrieving all locations: " + error.message);
    }
  }

  /**
   * Finds a location by its unique identifier.
   *
   * @param {number} LocationID - The unique identifier of the location to find.
   * @return {Promise<Location|null>} The found location as a Location instance, or null if not found.
   */
  static async findByID(LocationID) {
    const query = `SELECT * FROM Locations WHERE LocationID = ?`;

    try {
      const [rows] = await db.pool.query(query, [LocationID]);
      if (rows.length > 0) {
        return new Location(
          rows[0].LocationID,
          rows[0].BusinessID,
          rows[0].TypeID,
          rows[0].Latitude,
          rows[0].Longitude,
          rows[0].LocationName,
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error finding the location: " + error.message);
    }
  }

  /**
   * Updates specified details of a location by its unique identifier.
   *
   * @param {object} updateData - An object containing the location attributes to update.
   * @return {Promise<boolean>} True if the update was successful, false otherwise.
   */
  async update(updateData) {
    let query = "UPDATE Locations SET ";
    const queryParams = [];
    Object.entries(updateData).forEach(([key, value], index) => {
      query += `${key} = ?`;
      queryParams.push(value);
      if (index < Object.entries(updateData).length - 1) query += ", ";
    });
    query += " WHERE LocationID = ?";
    queryParams.push(this.LocationID);

    try {
      const [result] = await db.pool.query(query, queryParams);
      Object.assign(this, updateData); // Update current instance properties
      return result.changedRows > 0;
    } catch (error) {
      throw new Error("Error updating location: " + error.message);
    }
  }

  /**
   * Deletes the location and all related entities from the database.
   * This method performs a cascading delete operation, removing any dependent
   * records in the Shipments and InventoryLevels tables before deleting the
   * location itself. The deletion is wrapped in a transaction to ensure data
   * integrity is maintained throughout the process.
   *
   * If the location is successfully deleted, or if it doesn't exist, the method returns true.
   * In case of any failure during the deletion process, the transaction is rolled back, and
   * an error is thrown, indicating the failure reason.
   *
   * @return {Promise<boolean>} True if the location and all related entities were
   * successfully deleted, false otherwise.
   * @throws {Error} If an error occurs during the deletion process.
   */
  async delete() {
    const connection = await db.pool.getConnection();

    try {
      await connection.beginTransaction();
      // Before attempting to delete, ensure that this location is not referenced by other entities.
      await connection.query(
        "DELETE FROM Shipments WHERE SourceID = ? OR DestinationID = ?",
        [this.LocationID, this.LocationID],
      );
      await connection.query(
        "DELETE FROM InventoryLevels WHERE LocationID = ?",
        [this.LocationID],
      );

      await connection.query("DELETE FROM Locations WHERE LocationID = ?", [
        this.LocationID,
      ]);

      await connection.commit();
      return true; // Returns true if the location was successfully deleted
    } catch (error) {
      await connection.rollback();
      throw new Error("Error performing cascading delete: " + error.message);
    } finally {
      connection.release();
    }
  }

  // Additional methods as needed for location management, such as querying related shipments or inventory levels...
}

module.exports = Location;
