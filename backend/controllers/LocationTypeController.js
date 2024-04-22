const LocationType = require("../models/LocationType");

class LocationTypeController {
  static async getLocationType(req, res) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Location type ID must be provided" });
    }

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
      res.status(500).json({ error: "Database error occurred." + " " + error });
    }
  }
}

module.exports = LocationTypeController;
