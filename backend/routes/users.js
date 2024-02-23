/**
 * This file defines the routes that will
 * appear in the users section of the API
 * at /api/v1/users/
 *
 * TODO: implement routes in this file
 */

const express = require("express");
const router = express.Router();

// Send list of all users at a company
router.get("/:companyId", (req, res) => {
  const companyId = parseInt(req.params.companyId, 10);
  // Get all users for company here
  res.send([]);
});

// Add more company-related routes below

module.exports = router;
