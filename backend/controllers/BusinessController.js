const Business = require("../models/Business");

class BusinessController {
  static async createBusiness(req, res) {
    const { BusinessName, Description } = req.body;
    try {
      const business = new Business(null, BusinessName, Description);
      const result = await business.save();
      res.status(201).json({
        message: "Business created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async getBusinesses(req, res) {
    try {
      const businesses = await Business.findAll();
      res.status(200).json({
        message: "Businesses retrieved successfully",
        data: businesses,
      });
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async getBusiness(req, res) {
    const { id } = req.params;
    try {
      const business = await Business.findByID(id);
      if (business) {
        res.status(200).json({
          message: "Business retrieved successfully",
          data: business,
        });
      } else {
        res.status(404).json({ error: "Business not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async updateBusiness(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const business = await Business.findByID(id);
      if (business) {
        const updated = await business.update(updateData);
        if (updated) {
          res.status(200).json({
            message: "Business updated successfully",
            data: await Business.findByID(id),
          });
        } else {
          res.status(404).json({ error: "Business update failed" });
        }
      } else {
        res.status(404).json({ error: "Business not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." });
    }
  }

  static async deleteBusiness(req, res) {
    const { id } = req.params;
    try {
      const business = await Business.findByID(id);
      if (business) {
        await business.delete();
        res.status(200).json({
          message: "Business deleted successfully",
        });
      } else {
        res.status(404).json({ error: "Business not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error occurred." +  " " + error});
    }
  }
}

module.exports = BusinessController;