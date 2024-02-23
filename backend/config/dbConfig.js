const mysql = require('mysql2/promise');

// Database configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Utility function to get a database connection
async function getConnection() {
  return pool.getConnection();
}

module.exports = {
  getConnection,
  pool, 
};
