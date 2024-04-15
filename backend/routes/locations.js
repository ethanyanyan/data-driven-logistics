const express = require("express");
const router = express.Router();
const LocationController = require('../controllers/LocationController');

router.post("/", LocationController.createLocation); // BusinessID, Latitude, Longitude

router.get("/:id", LocationController.getLocation);

router.patch("/:id", LocationController.updateLocation);

router.delete("/:id", LocationController.deleteLocation);

module.exports = router;
