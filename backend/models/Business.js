const db = require("../config/dbConfig");
const Location = require("./Location");

class Business {
  constructor(BusinessID, BusinessName, Description) {
    this.BusinessID = BusinessID;
    this.BusinessName = BusinessName;
    this.Description = Description;
  }

  async save() {
    const query = `
      INSERT INTO Businesses (BusinessName, Description)
      VALUES (?, ?)
    `;
    const values = [this.BusinessName, this.Description];

    try {
      const [result] = await db.pool.query(query, values);
      this.BusinessID = result.insertId;
      return result;
    } catch (error) {
      throw new Error("Error saving the business: " + error.message);
    }
  }

  static async findAll() {
    const query = `SELECT * FROM Businesses`;

    try {
      const [rows] = await db.pool.query(query);
      return rows.map(
        (row) =>
          new Business(row.BusinessID, row.BusinessName, row.Description),
      );
    } catch (error) {
      throw new Error("Error retrieving all businesses: " + error.message);
    }
  }

  static async findByID(BusinessID) {
    const query = `SELECT * FROM Businesses WHERE BusinessID = ?`;

    try {
      const [rows] = await db.pool.query(query, [BusinessID]);
      if (rows.length > 0) {
        return new Business(
          rows[0].BusinessID,
          rows[0].BusinessName,
          rows[0].Description,
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error finding the business: " + error.message);
    }
  }

  async update(updateData) {
    let query = "UPDATE Businesses SET ";
    const queryParams = [];
    Object.entries(updateData).forEach(([key, value], index) => {
      query += `${key} = ?`;
      queryParams.push(value);
      if (index < Object.entries(updateData).length - 1) query += ", ";
    });
    query += " WHERE BusinessID = ?";
    queryParams.push(this.BusinessID);

    try {
      const [result] = await db.pool.query(query, queryParams);
      Object.assign(this, updateData);
      return result.changedRows > 0;
    } catch (error) {
      throw new Error("Error updating business: " + error.message);
    }
  }

  async delete() {
    const connection = await db.pool.getConnection();

    try {
      await connection.beginTransaction();

      // Delete related locations
      const locations = await connection.query(
        "SELECT * FROM Locations WHERE BusinessID = ?",
        [this.BusinessID],
      );
      for (const location of locations[0]) {
        const locationInstance = new Location(
          location.LocationID,
          location.BusinessID,
          location.TypeID,
          location.Latitude,
          location.Longitude,
          location.LocationName,
        );
        await locationInstance.delete();
      }

      // Delete related records in the Users table
      await connection.query("DELETE FROM Users WHERE BusinessID = ?", [
        this.BusinessID,
      ]);

      // Delete the business itself
      await connection.query("DELETE FROM Businesses WHERE BusinessID = ?", [
        this.BusinessID,
      ]);

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw new Error("Error deleting business: " + error.message);
    } finally {
      connection.release();
    }
  }
}

module.exports = Business;
