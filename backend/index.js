const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

// Initialize express app
const app = express();

// Use CORS
app.use(cors());

// Body parser middleware to parse JSON bodies
app.use(express.json());

// Define a sample route for GET requests
app.get('/', (req, res) => {
  res.send('Hello, World! This is the backend of Data Driven Logistics.');
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
    queueLimit: 0
  });

app.get('/test-db', (req, res) => {
    pool.query('SELECT 1 + 1 AS solution', (error, results) => {
        if (error) {
        return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ solution: results[0].solution });
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
