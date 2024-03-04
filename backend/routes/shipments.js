/**
 * This file defines the routes that involves
 * Shipment Logging and tracking
 * 
 * MAJOR TO DOS as of Mar-3-2024: Filteering and Sorting & DB Changes & Refactoring of backend services
 */

const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig");

// Endpoint for logging new shipments
router.post("/", async (req, res) => {
    const { SourceID, DestinationID, DepartureDate, ArrivalDate, Status } = req.body;
    const connection = await db.getConnection();
    console.log("Request body: ", req.body)
    console.log("SourceID: ", SourceID, "DestinationID: ", DestinationID, "DepartureDate: ", DepartureDate, "ArrivalDate: ", ArrivalDate, "Status: ", Status);
    try {
      // Insert the new shipment into the database
      const [result] = await connection.query(
        "INSERT INTO Shipments (SourceID, DestinationID, DepartureDate, ArrivalDate, Status) VALUES (?, ?, ?, ?, ?)",
        [SourceID, DestinationID, DepartureDate, ArrivalDate, Status]
      );
      console.log("Shipment logged successfully", result);
      res.status(201).json({
        status: 201,
        message: "Shipment logged successfully",
        data: { id: result.insertId, ...req.body }
      });
    } catch (error) {
      // Handle database errors gracefully
      console.error("Database error: ", error);
      return res.status(500).json({ 
        status: 500,
        error: "Database error occurred." 
      });
    } finally {
      // Release connection back to pool
      if (connection) {
        connection.release();
      }
    }
  });

// Endpoint for getting the status and details of a shipment
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await db.getConnection();
    try {
      // Retrieve the shipment with the given id from the database
      const [rows] = await connection.query("SELECT * FROM Shipments WHERE ShipmentID = ?", [id]);
      if (rows.length > 0) {
        console.log(`Shipment id ${id} retrieved successfully`, rows[0]);
        res.status(200).json({
          status: 200,
          data: rows[0]
        });
      } else {
        res.status(404).json({ 
          status: 404,
          message: `Shipment with id ${id} not found` 
        });
      }
    } catch (error) {
      // Handle database errors gracefully
      console.error("Database error: ", error);
      return res.status(500).json({ 
        status: 500,
        error: "Database error occurred." 
      });
    } finally {
      // Release connection back to pool
      if (connection) {
        connection.release();
      }
    }
  });
// Endpoint for getting all shipments with support for filtering and sorting
router.get("/", async (req, res) => {
    // TODO: Do further work on filtering and sorting
    const connection = await db.getConnection();
    try {
      // Retrieve all shipments from the database
      const [rows] = await connection.query("SELECT * FROM Shipments");
      console.log("Shipments retrieved successfully", rows);
      res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      // Handle database errors gracefully
      console.error("Database error: ", error);
      return res.status(500).json({ 
        status: 500,
        error: "Database error occurred." 
      });
    } finally {
      // Release connection back to pool
      if (connection) {
        connection.release();
      }
    }
  });

module.exports = router;
