const express = require('express');
const cors = require('cors');
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

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
