/**
 * UserController.js
 * This controller handles all user-related operations, including user registration, login,
 * fetching users by company ID, and retrieving user profiles. It abstracts the business logic
 * away from the route definitions, making the codebase more maintainable.
 */

const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const User = require("../models/user");

class UserController {
  // Registers a new user
  static async register(req, res) {
    try {
      const userObj = {
        BusinessID: req.body.businessId,
        RoleID: req.body.roleId,
        Username: req.body.username,
        Password: req.body.password,
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
      };

      const result = await User.save(userObj);
      res.status(201).send("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send(error.message);
    }
  }

  // Handles user login
  static async login(req, res) {
    const { generateToken } = require("../middleware/auth");
    const { username, password } = req.body;
    try {
      const [rows] = await db.pool.query(
        "SELECT * FROM Users WHERE Username = ?",
        [username],
      );

      if (rows.length > 0) {
        const user = rows[0];
        bcrypt.compare(password, user.Password, function (err, result) {
          if (err) {
            return res.status(500).json({ error: "Error comparing password" });
          }
          if (result) {
            const userForResponse = {
              UserID: user.UserID,
              Username: user.Username,
              FirstName: user.FirstName,
              LastName: user.LastName,
              BusinessID: user.BusinessID,
              RoleID: user.RoleID,
            };
            const token = generateToken(user);
            return res.json({
              message: "Login successful",
              token: token,
              user: userForResponse,
            });
          } else {
            return res.status(401).json({ message: "Invalid credentials" });
          }
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Retrieves users by their associated company ID
  static async getUsersByCompany(req, res) {
    try {
      const [results] = await db.pool.query(
        "SELECT * FROM Users WHERE BusinessID = ?",
        [req.params.companyId],
      );
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  // Fetches the profile of the logged-in user
  static async getUserProfile(req, res) {
    const userId = req.user.UserID;
    try {
      const [results, fields] = await db.pool.execute(
        "SELECT * FROM Users WHERE UserID = ?",
        [userId],
      );
      res.status(200).json(results[0]);
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }
}

module.exports = UserController;
