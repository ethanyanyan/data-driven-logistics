/**
 * This file defines the routes that will
 * appear in the users section of the API
 * at /api/v1/users/
 *
 * TODO: implement routes in this file
 */

const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig");
const { requireAuth, generateToken } = require("../middleware/auth");
const bcrypt = require("bcrypt");

// Login Request route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query database for user
    const [rows] = await db.pool.query(
      "SELECT * FROM Users WHERE Username = ?",
      [username],
    );

    if (rows.length > 0) {
      // User found, now compare passwords
      const user = rows[0];

      // Correctly using password from req.body and ensuring we use the correct case for the user's Password property
      bcrypt.compare(password, user.Password, function (err, result) {
        if (err) {
          console.error("Error comparing password:", err);
          return res.status(500).json({ error: "Error comparing password" });
        }
        if (result) {
          // Passwords match, generate and return JWT or another success response

          const userForResponse = {
            Username: user.Username,
            FirstName: user.FirstName,
            LastName: user.LastName,
            BusinessID: user.BusinessID,
            RoleID: user.RoleID,
          };

          const token = generateToken({ username: user.Username });
          console.log("Login successful");
          return res.json({
            message: "Login successful",
            token: token,
            user: userForResponse,
          });
        } else {
          // Passwords do not match
          console.log("Passwords do not match");
          return res.status(401).json({ message: "Invalid credentials" });
        }
      });
    } else {
      // No user found with that username
      console.log("No user found with that username");
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Database query error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Send list of all users at a company
router.get("/:companyId", (req, res) => {
  const companyId = req.params.companyId;
  // Simulate a database query
  db.query(
    "SELECT * FROM Users WHERE BusinessID = ?",
    [companyId],
    (error, results) => {
      if (error) {
        // Handle the database error gracefully
        return res.status(500).json({ error: "Database error occurred." });
      }
      // Send the query results
      res.status(200).json(results);
    },
  );
});

// Define a protected route
// Example: Get user profile which is a protected route
router.get("/profile", requireAuth, (req, res) => {
  const userId = req.user.id;
  // Simulate a database query
  // NOTE: check ../config/dbConfig.js for latest usage of db object
  db.query(
    "SELECT * FROM Users WHERE UserID = ?",
    [userId],
    (error, results) => {
      if (error) {
        // Handle the database error gracefully
        print(error);
        return res.status(500).json({ error: "Database error occurred." });
      }
      // Send the query results
      res.status(200).json(results);
    },
  );
});

module.exports = router;
