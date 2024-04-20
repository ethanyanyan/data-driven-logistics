const express = require("express");
const router = express.Router();
const BusinessController = require("../controllers/BusinessController");

router.post("/", BusinessController.createBusiness);

router.get("/", BusinessController.getBusinesses);

router.get("/:id", BusinessController.getBusiness);

router.patch("/:id", BusinessController.updateBusiness);

router.delete("/:id", BusinessController.deleteBusiness);

module.exports = router;