const db = require("../config/dbConfig");

class LocationType {
  constructor(TypeID, Name) {
    this.TypeID = TypeID;
    this.Name = Name;
  }

  async save() {
    const query = `INSERT INTO LocationTypes (Name) VALUES (?)`;
    const values = [this.Name];

    try {
      const [result] = await db.pool.query(query, values);
      this.TypeID = result.insertId;
      return result;
    } catch (error) {
      throw new Error("Error saving the location type: " + error.message);
    }
  }

  static async findByID(TypeID) {
    const query = `SELECT * FROM LocationTypes WHERE TypeID = ?`;

    try {
      const [rows] = await db.pool.query(query, [TypeID]);
      if (rows.length > 0) {
        return new LocationType(rows[0].TypeID, rows[0].Name);
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error finding the location type: " + error.message);
    }
  }

  async update() {
    const query = `UPDATE LocationTypes SET Name = ? WHERE TypeID = ?`;
    const values = [this.Name, this.TypeID];

    try {
      const [result] = await db.pool.query(query, values);
      return result.changedRows > 0;
    } catch (error) {
      throw new Error("Error updating the location type: " + error.message);
    }
  }

  async delete() {
    const query = `DELETE FROM LocationTypes WHERE TypeID = ?`;

    try {
      await db.pool.query(query, [this.TypeID]);
      return true;
    } catch (error) {
      throw new Error("Error deleting the location type: " + error.message);
    }
  }
}

module.exports = LocationType;