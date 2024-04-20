const Location = require("../models/Location");

class LocationController {
  static async createLocation(req, res) {
    const { BusinessID, TypeID, Latitude, Longitude, LocationName } = req.body;
    try {
      const location = new Location(
        null,
        BusinessID,
        TypeID,
        Latitude,
        Longitude,
        LocationName,
      );
      const result = await location.save();
      res.status(201).json({
        message: "Location created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  /**
   * Fetches all locations and returns them.
   *
   * @param {express.Request} req The request object.
   * @param {express.Response} res The response object.
   */
  static async getLocations(req, res) {
    try {
      const locations = await Location.findAll();
      res.status(200).json({
        message: "Locations retrieved successfully",
        data: locations,
      });
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async getLocation(req, res) {
    const { id } = req.params;
    try {
      const location = await Location.findByID(id);
      if (location) {
        res.status(200).json({
          message: "Location retrieved successfully",
          data: location,
        });
      } else {
        res.status(404).json({ error: "Location not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async updateLocation(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const location = await Location.findByID(id);
      if (location) {
        const updated = await location.update(updateData);
        if (updated) {
          res.status(200).json({
            message: "Location updated successfully",
            data: await Location.findByID(id),
          });
        } else {
          res.status(404).json({ error: "Location update failed" });
        }
      } else {
        res.status(404).json({ error: "Location not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async deleteLocation(req, res) {
    const { id } = req.params;
    try {
      const location = await Location.findByID(id);
      if (location) {
        await location.delete();
        res.status(200).json({
          message: "Location deleted successfully",
        });
      } else {
        res.status(404).json({ error: "Location not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }
}

module.exports = LocationController;
