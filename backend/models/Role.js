const db = require("../config/dbConfig");

class Role {
  /**
   * Constructs a Role instance with detailed information.
   *
   * @param {number} RoleID - The unique identifier of the role.
   * @param {string} RoleName - The name for the role, like "Admin".
   * @param {string} Description - The text description of the role.
   */
  constructor(RoleID, RoleName, Description) {
    this.RoleID = RoleID;
    this.RoleName = RoleName;
    this.Description = Description;
  }

  /**
   * Retrieves all roles from the database.
   *
   * @return {Promise<Array<Role>>} An array of all Role instances.
   */
  static async findAll() {
    const query = `SELECT * FROM Roles`;
    try {
      const [rows] = await db.pool.query(query);
      return rows.map(
        (row) => new Role(row.RoleID, row.RoleName, row.Description)
      );
    } catch (error) {
      throw new Error("Error retrieving roles: " + error.message);
    }
  }
}

module.exports = Role;
