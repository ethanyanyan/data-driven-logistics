/**
 * This file defines the routes that involves
 * Shipment Logging and tracking
 * 
 * MAJOR TO DOS as of Mar-3-2024: Filteering and Sorting & DB Changes & Refactoring of backend services
 */

const express = require("express");
const router = express.Router();
const shipmentController = require('../controllers/ShipmentsController');
const db = require("../config/dbConfig");



// Endpoint for logging new shipments
router.post("/", shipmentController.logShipment);

// Endpoint for getting the status and details of a shipment
router.get("/:id", shipmentController.getShipment);

// Endpoint for getting all shipments with future support for filtering and sorting
router.get("/", shipmentController.getAllShipments);

// Endpoint to update shipments details - body should contain ONLY the fields to be updated
router.patch("/:id", shipmentController.updateShipment);

// Endpoint to delete shipments
router.delete("/:id", shipmentController.deleteShipment);

module.exports = router;
