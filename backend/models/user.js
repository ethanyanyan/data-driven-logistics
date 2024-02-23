const pool = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Cost factor for hashing

class User {
  constructor(userObj) {
    this.userID = userObj.userID;
    this.businessID = userObj.businessID;
    this.roleID = userObj.roleID;
    this.username = userObj.username;
    this.password = userObj.password; // This will be a hashed password
    this.firstName = userObj.firstName;
    this.lastName = userObj.lastName;
  }

  // Hash password and save a user to the database
  static async save(userObj) {
    try {
      const hashedPassword = await this.hashPassword(userObj.password); // Added await here

      const [result] = await pool.execute(
        "INSERT INTO Users (BusinessID, RoleID, Username, Password, FirstName, LastName) VALUES (?, ?, ?, ?, ?, ?)",
        [
          userObj.businessID,
          userObj.roleID,
          userObj.username,
          hashedPassword,
          userObj.firstName,
          userObj.lastName,
        ],
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Static method to hash a password
  static hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
  }

  // Find a user by username
  static async findByUsername(username) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM Users WHERE Username = ?",
        [username],
      );
      if (rows.length > 0) {
        return new User(rows[0]);
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Verify user's password
  async verifyPassword(password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  }

  // Additional methods as needed for user management
}

module.exports = User;
