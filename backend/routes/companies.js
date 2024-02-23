/**
 * This file defines the routes that will
 * appear in the companies section of the API
 * at /api/v1/companies/
 *
 * TODO: implement routes in this file
 */

const express = require("express");
const router = express.Router();

// Send list of all companies
router.get("/", (req, res) => {
  res.json([]);
});

// Add more company-related routes below

module.exports = router;
