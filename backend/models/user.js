require("dotenv").config();
const pool = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Cost factor for hashing

class User {
  constructor(userObj) {
    this.UserID = userObj.UserID;
    this.BusinessID = userObj.BusinessID;
    this.RoleID = userObj.RoleID;
    this.Username = userObj.Username;
    this.Password = userObj.Password; // This will be a hashed password
    this.FirstName = userObj.FirstName;
    this.LastName = userObj.LastName;
  }

  // Hash password and save a user to the database
  static async save(userObj) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const hashedPassword = await this.hashPassword(userObj.Password);

      const [result] = await connection.query(
        "INSERT INTO Users (BusinessID, RoleID, Username, Password, FirstName, LastName) VALUES (?, ?, ?, ?, ?, ?)",
        [
          userObj.BusinessID,
          userObj.RoleID,
          userObj.Username,
          hashedPassword,
          userObj.FirstName,
          userObj.LastName,
        ],
      );
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Static method to hash a password
  static hashPassword(Password) {
    return bcrypt.hash(Password, saltRounds);
  }

  // Find a user by username
  static async findByUsername(Username) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM Users WHERE Username = ?",
        [Username],
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
  async verifyPassword(Password) {
    try {
      return await bcrypt.compare(Password, this.Password);
    } catch (error) {
      throw error;
    }
  }

  // Additional methods as needed for user management
}

module.exports = User;
