const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const applyRoutesMapping = require("./routes-map");
const path = require("path");

// Initialize express app
const app = express();

// Use CORS
app.use(cors());

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

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/test-db", (req, res) => {
  pool.query("SELECT 1 + 1 AS solution", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ solution: results[0].solution });
  });
});

// Start the server if this script is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export app so it can be used in tests
module.exports = app;
