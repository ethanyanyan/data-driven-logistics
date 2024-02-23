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
const { requireAuth } = require("../middleware/auth");

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
