const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const applyRoutesMapping = require("./routes-map");
const path = require("path");
const { passport } = require("./middleware/auth");

// Initialize express app
const app = express();

// Use CORS
app.use(cors());

// Initialize passport
app.use(passport.initialize());

// Body parser middleware to parse JSON bodies
app.use(express.json());

// Use all routes from API, i.e. /api/v1/users and others
applyRoutesMapping(app);

// For any non-API route, serve the built frontend
const buildPath = path.join(__dirname, "..", "frontend", "build");

// Serve static assets from the build directory
app.use(express.static(buildPath));

// Serve the 'index.html' file for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Define PORT
const PORT = process.env.PORT || 3001;

// Start the server if this script is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export app so it can be used in tests
module.exports = app;
