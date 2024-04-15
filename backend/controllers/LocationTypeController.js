const LocationType = require("../models/LocationType");

class LocationTypeController {
  static async createLocationType(req, res) {
    const { Name } = req.body;
    try {
      const locationType = new LocationType(null, Name);
      const result = await locationType.save();
      res.status(201).json({
        message: "Location type created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async getLocationType(req, res) {
    const { id } = req.params;
    try {
      const locationType = await LocationType.findByID(id);
      if (locationType) {
        res.status(200).json({
          message: "Location type retrieved successfully",
          data: locationType,
        });
      } else {
        res.status(404).json({ error: "Location type not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async updateLocationType(req, res) {
    const { id } = req.params;
    const { Name } = req.body;
    try {
      const locationType = await LocationType.findByID(id);
      if (locationType) {
        locationType.Name = Name;
        const updated = await locationType.update();
        if (updated) {
          res.status(200).json({
            message: "Location type updated successfully",
            data: locationType,
          });
        } else {
          res.status(404).json({ error: "Location type update failed" });
        }
      } else {
        res.status(404).json({ error: "Location type not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async deleteLocationType(req, res) {
    const { id } = req.params;
    try {
      const locationType = await LocationType.findByID(id);
      if (locationType) {
        await locationType.delete();
        res.status(200).json({
          message: "Location type deleted successfully",
        });
      } else {
        res.status(404).json({ error: "Location type not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }
}

module.exports = LocationTypeController;