const express = require("express");
const router = express.Router();
const LocationController = require('../controllers/LocationController');

router.post("/", LocationController.createLocation);

router.get("/:id", LocationController.getLocation);

router.put("/:id", LocationController.updateLocation);

router.delete("/:id", LocationController.deleteLocation);

module.exports = router;
