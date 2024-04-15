const express = require("express");
const router = express.Router();
const LocationTypeController = require("../controllers/LocationTypeController");

router.post("/", LocationTypeController.createLocationType);

router.get("/:id", LocationTypeController.getLocationType);

router.patch("/:id", LocationTypeController.updateLocationType);

router.delete("/:id", LocationTypeController.deleteLocationType);

module.exports = router;