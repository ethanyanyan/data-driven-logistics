const db = require("../config/dbConfig");

class LocationType {
  constructor(TypeID, Name) {
    this.TypeID = TypeID;
    this.Name = Name;
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
}

module.exports = LocationType;
