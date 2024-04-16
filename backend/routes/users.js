/**
 * This file defines the routes that will
 * appear in the users section of the API
 * at /api/v1/users/
 *
 * TODO: implement routes in this file
 */

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { requireAuth } = require("../middleware/auth");

// POST route for adding a new user
router.post("/register", UserController.register);

// Login Request route
router.post("/login", UserController.login);

router.get("/profile", requireAuth, UserController.getUserProfile);

// Send list of all users at a company
router.get("/:companyId", UserController.getUsersByCompany);

router.delete("/:userID", requireAuth, UserController.deleteUser);

// Define a protected route

module.exports = router;
