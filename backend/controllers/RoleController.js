const Role = require("../models/Role");

// Get all roles
async function getAllRoles(req, res) {
  try {
    const roles = await Role.findAll();
    res.status(200).json({
      message: "Roles retrieved successfully",
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred when getting all roles.",
    });
  }
}

module.exports = {
  getAllRoles,
};
