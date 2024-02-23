# Express Routes Organization

To maintain a structured backend codebase, the project utilizes `express.Router()` for defining API routes.

## Route Configuration

Routes are organized in the `/backend/routes-map.js` file, where they are imported and mapped to their respective endpoints.

## Applying Routes

In the main `index.js` file, all defined routes are applied to the Express app as middleware using the following code:

```javascript
const applyRoutesMapping = require("./backend/routes-map");
```

This modular approach simplifies route management, enhances code readability, 
and makes it easy to extend the API with new routes. Tests for the routes 
are located in the `/backend/tests` folder.
