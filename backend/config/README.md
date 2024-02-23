# Database configuration

This directory contains the functionality needed to establish
and manage connections to our MySQL database. Here's an exmple of
one way you can use
the database in other parts of the backend:

```javascript
const db = require("../config/dbConfig");

// Fetch a database connection
const connection = await db.getConnection();

try {
  // Your database ops here
  const result = await db.pool.query("SELECT * FROM Users");
} catch (error) {
  // Handle database errors gracefully
  console.error("Database error: ", error)
} finally {
  // Release connection back to pool
  if (connection) {
    connection.release();
  }
}
```

First, you can use the `getConnection` function to obtain a connection
from the pool. Then you can execute your operations taking care to
handle any potential errors. Finally, you can release the connection
back to the pool for better resource management.
