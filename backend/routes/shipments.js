/**
 * This file defines the routes that involves
 * Shipment Logging and tracking
 *
 * MAJOR TO DOS as of Mar-3-2024: Filteering and Sorting & DB Changes & Refactoring of backend services
 */

const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/ShipmentsController");
const db = require("../config/dbConfig");

/**
 * Endpoints dealing with just the Shipments table itself
 */

// Endpoint for logging new shipments
router.post("/", shipmentController.logShipment);

// Endpoint for getting the status of a shipment
router.get("/:id", shipmentController.getShipment);

// Get all shipments by a specific business ID
router.get(
  "/business/:businessId",
  shipmentController.getShipmentsByBusinessId
);

// Endpoint for getting all shipments with future support for filtering and sorting
router.get("/", shipmentController.getAllShipments);

// Endpoint to update details of shipments details - body should contain ONLY the fields to be updated
router.patch("/:id", shipmentController.updateShipment);

// Endpoint to delete shipments
router.delete("/:id", shipmentController.deleteShipment);

/**
 * Endpoints dealing with the ShipmentDetails
 */

// Get every shipment detail for a specific shipment

// Get all shipment details(items) for a specific shipment
router.get("/:id/details", shipmentController.getShipmentDetails);

// Log a new shipment detail(item) for a specific shipment
// NOTE: If a shipmentDetail with the same ShipmentID and ProductID already exist, the qty will be updated instead
router.post("/:id", shipmentController.logShipmentDetails);

module.exports = router;
