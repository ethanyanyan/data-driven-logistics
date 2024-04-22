const express = require("express");
const router = express.Router();
const LocationTypeController = require("../controllers/LocationTypeController");

// only GET exists temporarily
router.get("/:id", LocationTypeController.getLocationType);

module.exports = router;