require("dotenv").config();
const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Cost factor for hashing

class User {
  /**
   * Creates a new User instance with the specified properties.
   *
   * @param {object} userObj - An object containing the user's properties.
   */
  constructor(userObj) {
    this.UserID = userObj.UserID;
    this.BusinessID = userObj.BusinessID;
    this.RoleID = userObj.RoleID;
    this.Username = userObj.Username;
    this.Password = userObj.Password; // This will be a hashed password
    this.FirstName = userObj.FirstName;
    this.LastName = userObj.LastName;
  }

  /**
   * Hashes a password using bcrypt with a predefined number of salt rounds.
   *
   * @param {string} Password - The plaintext password to hash.
   * @return {Promise<string>} The hashed password.
   */
  static hashPassword(Password) {
    return bcrypt.hash(Password, saltRounds);
  }

  /**
   * Saves a new user to the database with hashed password.
   *
   * @param {object} userObj - An object representing the user to save.
   * @return {Promise<object>} The result object from the database operation.
   */
  static async save(userObj) {
    const connection = await db.pool.getConnection();

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

  /**
   * Finds a user by their unique UserID.
   *
   * @param {number} UserID - The unique identifier of the user to find.
   * @return {Promise<User|null>} The found user as a User instance, or null if not found.
   */
  static async findByUserID(UserID) {
    try {
      const [rows] = await db.pool.execute(
        "SELECT * FROM Users WHERE UserID = ?",
        [UserID],
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

  /**
   * Verifies if the provided plaintext password matches the user's hashed password.
   *
   * @param {string} Password - The plaintext password to verify.
   * @return {Promise<boolean>} True if the password matches, false otherwise.
   */
  async verifyPassword(Password) {
    try {
      return await bcrypt.compare(Password, this.Password);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a user's details in the database.
   *
   * @param {number} userID - The unique identifier of the user to update.
   * @param {object} updateFields - An object where keys represent the names of the user attributes to be updated, and values represent the new values for those attributes.
   * For example, {FirstName: 'John', LastName: 'Doe'}. If updating the password, the new password will be automatically hashed before being stored.
   *
   * TODO: Implement the corresponding API endpoint to expose this functionality in a future sprint. Ensure to validate input data and handle authentication/authorization as required.
   */
  static async updateUser(userID, updateFields) {
    const connection = await db.pool.getConnection();
    try {
      await connection.beginTransaction();

      let query = "UPDATE Users SET ";
      const queryParams = [];
      Object.keys(updateFields).forEach((field, index) => {
        query += `${field} = ?`;
        queryParams.push(updateFields[field]);
        if (index < Object.keys(updateFields).length - 1) query += ", ";
      });
      query += " WHERE UserID = ?";
      queryParams.push(userID);

      // Hash password if it's in the updateFields
      if (updateFields.hasOwnProperty("Password")) {
        queryParams[queryParams.length - 2] = await this.hashPassword(
          updateFields["Password"],
        );
      }

      const [result] = await connection.query(query, queryParams);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw new Error("Error updating the user: " + error.message);
    } finally {
      connection.release();
    }
  }

  // Additional methods as needed for user management
}

module.exports = User;
