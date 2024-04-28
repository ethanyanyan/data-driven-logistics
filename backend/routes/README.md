# API Documentation for My Express.js Project

Base URL: `http://localhost:3001/api/v1/`

## Table of Contents
- [Business](#business)
- [Inventory](#inventory)
- [Locations](#locations)
- [Products](#products)
- [Roles](#roles)
- [Shipments](#shipments)
- [Users](#users)
## Business

### POST /business
- **Description**: Creates a new business entry.
- **Parameters**: `None`
- **Request Body**:
  ```json
  {
    "BusinessName": "string",
    "Description": "string"
  }
  ```
- **Responses**:
    - Success Response (201):
    ```json
    {
        "message": "Business created successfully",
        "data": {
            "BusinessID": "integer",
            "BusinessName": "string",
            "Description": "string"
        }
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /business
- **Description**: Retrieves a list of all businesses.
- **Parameters**: `None`
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Businesses retrieved successfully",
        "data": {
            "BusinessID": "integer",
            "BusinessName": "string",
            "Description": "string"
        } ... 
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /business/:id
- **Description**: Retrieves details of a specific business by ID.
- **Parameters**: `id` (integer): Unique identifier of the business.
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Business retrieved successfully",
        "data": {
            "BusinessID": "integer",
            "BusinessName": "string",
            "Description": "string"
        }
    }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Business not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### PATCH /business/:id
- **Description**: Updates details of a specific business by ID.
- **Parameters**: `id` (integer): Unique identifier of the business.
- **Request Body**:
  ```json
    {
        "BusinessName": "string (optional)",
        "Description": "string (optional)"
    }
  ```
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Business updated successfully",
        "data": {
            "BusinessID": "integer",
            "BusinessName": "string",
            "Description": "string"
        }
    }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Business not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### DELETE /business/:id
- **Description**: Deletes a specific business by ID.
- **Parameters**: `id` (integer): Unique identifier of the business to delete.
- **Responses**:
    - Success Response (200):
    ```json
    { "message": "Business deleted successfully" }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Business not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```


## Companies
### GET /companies
- **Description**: Get a list of all companies.
- **Parameters**: `None`
- **Response Example**:
  ```json
  {
    "companies": [...]
  }
  ```

## Inventory

### POST /inventory
- **Description**: Creates a new inventory item.
- **Parameters**: `None`
- **Request Body**:
  ```json
  {
    "LocationID": "integer",
    "ProductID": "integer",
    "Quantity": "integer"
  }
  ```
  
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Item logged successfully",
        "data": {
            "InventoryLevelID": "integer",
            "LocationID": "integer",
            "ProductID": "integer",
            "Quantity": "integer"
        }
    }
    ```
    - Databse error (500):
    ```json
    { "error": "Database error occurred." }
    ```
### GET /inventory/
- **Description**: Retrieves all inventory items.
- **Parameters**: `None`
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Items retrieved successfully",
        "data": [
            {
            "InventoryLevelID": "integer",
            "LocationID": "integer",
            "ProductID": "integer",
            "Quantity": "integer"
            }, ...
        ]
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /inventory/:id
- **Description**: Retrieves a specific inventory item by its ID.
- **Parameters**: `id` (integer): Unique identifier of the inventory item.
  
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Inventory id [id] retrieved successfully",
        "data": {
            "InventoryLevelID": "integer",
            "LocationID": "integer",
            "ProductID": "integer",
            "Quantity": "integer"
        }
    }
    ```
    - Error Response (404):
    ```json
    { "error": "Inventory with id [id] not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```
### PUT /inventory/:id
- **Description**: Updates the quantity of a specific inventory item.
- **Parameters**: `id` (integer): Unique identifier of the inventory item to update.
- **Request Body**:
  ```json
  {"Quantity": "integer"}
  ```
  
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Quantity for inventory [id] updated successfully",
        "data": {
            "InventoryLevelID": "integer",
            "LocationID": "integer",
            "ProductID": "integer",
            "Quantity": "integer"
        }
    }
    ```
    - Error Response (404):
    ```json
    { "error": "Inventory with id [id] not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Error updating the inventory level quantity" }
    ```

### PATCH /inventory/:id
- **Description**: Updates details of a specific inventory item.
- **Parameters**: `id` (integer): Unique identifier of the inventory item to update.
- **Request Body**:
  ```json
    {
        "LocationID": "integer (optional)",
        "ProductID": "integer (optional)",
        "Quantity": "integer (optional)"
    }
  ```
  
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "InventoryLevel id [id] updated successfully",
        "data": {
            "InventoryLevelID": "integer",
            "LocationID": "integer",
            "ProductID": "integer",
            "Quantity": "integer"
        }
    }
    ```
    - Error Response (404):
    ```json
    { "error": "Inventory with id [id] not found" }
    ```
     Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```
### DELETE /inventory/:id
- **Description**: Deletes a specific inventory item.
- **Parameters**: `id` (integer): Unique identifier of the inventory item to delete.
- **Responses**:
    - Success Response (200):
    ```json
    { "message": "InventoryLevel id [id] deleted successfully" }
    ```
    - Error Response (404):
    ```json
    { "error": "Inventory with id [id] not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

## Locations

### POST /locations
- **Description**: Creates a new location entry.
- **Parameters**: `None`
- **Request Body**:
  ```json
  {
    "BusinessID": "integer",
    "TypeID": "integer",
    "Latitude": "float",
    "Longitude": "float",
    "LocationName": "string"
  }
  ```
- **Responses**:
    - Success Response (201):
    ```json
    {
        "message": "Location created successfully",
        "data": {
            "LocationID": "integer",
            "BusinessID": "integer",
            "TypeID": "integer",
            "Latitude": "float",
            "Longitude": "float",
            "LocationName": "string"
        }
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /locations
- **Description**: Retrieves all locations.
- **Parameters**: `None`
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Locations retrieved successfully",
        "data": [
            {
                "LocationID": "integer",
                "BusinessID": "integer",
                "TypeID": "integer",
                "Latitude": "float",
                "Longitude": "float",
                "LocationName": "string"
            }, ...
        ]
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /locations/:id
- **Description**: Retrieves details of a specific location by ID.
- **Parameters**: `id` (integer): Unique identifier of the location.
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Location retrieved successfully",
        "data": {
            "LocationID": "integer",
            "BusinessID": "integer",
            "TypeID": "integer",
            "Latitude": "float",
            "Longitude": "float",
            "LocationName": "string"
        }
    }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Location not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### PATCH /locations/:id
- **Description**: Updates details of a specific location by ID.
- **Parameters**: `id` (integer): Unique identifier of the location to update.
- **Request Body**:
  ```json
    {
        "BusinessID": "integer (optional)",
        "TypeID": "integer (optional)",
        "Latitude": "float (optional)",
        "Longitude": "float (optional)",
        "LocationName": "string (optional)"
    }
  ```
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Location updated successfully",
        "data": {
            "LocationID": "integer",
            "BusinessID": "integer",
            "TypeID": "integer",
            "Latitude": "float",
            "Longitude": "float",
            "LocationName": "string"
        }
    }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Location not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### DELETE /locations/:id
- **Description**: Deletes a specific location by ID.
- **Parameters**: `id` (integer): Unique identifier of the location to delete.
- **Responses**:
    - Success Response (200):
    ```json
    { "message": "Location deleted successfully" }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Location not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

## Products

### POST /products
- **Description**: Creates a new product.
- **Parameters**: `None`
- **Request Body**:
  ```json
  {
    "Name": "string",
    "Description": "string",
    "UnitPrice": "float"
  }
  ```
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Product created successfully",
        "data": {
            "ProductID": "integer",
            "Name": "string",
            "Description": "string",
            "UnitPrice": "float"
        }
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /products/:id
- **Description**: Retrieves details of a specific product by ID.
- **Parameters**: `id` (integer): Unique identifier of the product.
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Product id [id] retrieved successfully",
        "data": {
            "ProductID": "integer",
            "Name": "string",
            "Description": "string",
            "UnitPrice": "float"
        }
    }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Product with id [id] not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /products
- **Description**: Retrieves all products.
- **Parameters**: `None`
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "All products retrieved successfully",
        "data": [
            {
                "ProductID": "integer",
                "Name": "string",
                "Description": "string",
                "UnitPrice": "float"
            }, ...
        ]
    }
    ```
    - Not Found Response (404):
    ```json
    { "error": "No products found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### PATCH /products/:id
- **Description**: Updates details of a specific product by ID.
- **Parameters**: `id` (integer): Unique identifier of the product to update.
- **Request Body**:
  ```json
    {
        "Name": "string (optional)",
        "Description": "string (optional)",
        "UnitPrice": "float (optional)"
    }
  ```
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Product id [id] updated successfully",
        "data": {
            "ProductID": "integer",
            "Name": "string",
            "Description": "string",
            "UnitPrice": "float"
        }
    }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Product with id [id] not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### DELETE /products/:id
- **Description**: Deletes a specific product by ID.
- **Parameters**: `id` (integer): Unique identifier of the product to delete.
- **Responses**:
    - Success Response (200):
    ```json
    { "message": "Product id [id] deleted successfully" }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Product with id [id] not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

## Roles

### GET /roles
- **Description**: Retrieves all roles.
- **Parameters**: `None`
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Roles retrieved successfully",
        "data": [
            {
                "RoleID": "integer",
                "RoleName": "string",
                "Permissions": "string"
            }, ...
        ]
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred when getting all roles." }
    ```

## Shipments

### POST /shipments
- **Description**: Logs a new shipment.
- **Parameters**: `None`
- **Request Body**:
  ```json
  {
    "SourceID": "integer",
    "UserID": "integer",
    "DestinationID": "integer",
    "DepartureDate": "string",
    "ArrivalDate": "string",
    "Status": "string"
  }
  ```
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Shipment logged successfully",
        "data": {
            "ShipmentID": "auto-generated",
            "SourceID": "integer",
            "UserID": "integer",
            "DestinationID": "integer",
            "DepartureDate": "string",
            "ArrivalDate": "string",
            "Status": "string"
        }
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /shipments/:id
- **Description**: Retrieves a specific shipment by ID.
- **Parameters**: `id` (integer): The unique identifier of the shipment.
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Shipment id [id] retrieved successfully",
        "data": {
            "ShipmentID": "auto-generated",
            "SourceID": "integer",
            "UserID": "integer",
            "DestinationID": "integer",
            "DepartureDate": "string",
            "ArrivalDate": "string",
            "Status": "string"
        }
    }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Shipment with id [id] not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /shipments
- **Description**: Retrieves all shipments.
- **Parameters**: `None`
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "All shipments retrieved successfully",
        "data": [
            {
            "ShipmentID": "integer",
            "SourceID": "integer",
            "UserID": "integer",
            "DestinationID": "integer",
            "DepartureDate": "string",
            "ArrivalDate": "string",
            "Status": "string"
            } ...
        ]
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### PATCH /shipments/:id
- **Description**: Updates details of a specific shipment by ID.
- **Parameters**: `id` (integer): The unique identifier of the shipment to update.
- **Request Body**:
  ```json
  {
    "SourceID": "integer (optional)",
    "DestinationID": "integer (optional)",
    "DepartureDate": "string (optional)",
    "ArrivalDate": "string (optional)",
    "Status": "string (optional)"
  }
  ```
- **Responses**:
    - Success Response (200):
    ```json
    {
        "message": "Shipment id [id] updated successfully",
        "data": {
            "ShipmentID": "integer",
            "SourceID": "integer",
            "UserID": "integer",
            "DestinationID": "integer",
            "DepartureDate": "string",
            "ArrivalDate": "string",
            "Status": "string"
        }
    }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Shipment with id [id] not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### DELETE /shipments/:id
- **Description**: Deletes a specific shipment by ID.
- **Parameters**: `id` (integer): The unique identifier of the shipment to delete.
- **Responses**:
    - Success Response (200):
    ```json
    { "message": "Shipment id [id] deleted successfully" }
    ```
    - Not Found Response (404):
    ```json
    { "error": "Shipment with id [id] not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

## Users

### POST /users/register
- **Description**: Registers a new user.
- **Parameters**: `None`
- **Request Body**:
  ```json
  {
    "businessId": "integer",
    "roleId": "integer",
    "username": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string"
  }
  ```
- **Responses**:
    - Success Response (201):
    ```json
    { "message": "User registered successfully" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### POST /users/login
- **Description**: Handles user login and returns a token.
- **Parameters**: `None`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Responses**:
    - Success Response (200):
    ```json
    {
        "success": true,
        "message": "Login successful",
        "token": "string",
        "user": {
            "UserID": "integer",
            "Username": "string",
            "FirstName": "string",
            "LastName": "string",
            "BusinessID": "integer",
            "RoleID": "integer"
        }
    }
    ```
    - Unauthorized (401):
    ```json
    { "success": false, "message": "Invalid credentials" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /users/profile
- **Description**: Fetches the profile of the logged-in user (Requires Authentication).
- **Parameters**: `None`
- **Responses**:
    - Success Response (200):
    ```json
    {
        "UserID": "integer",
        "Username": "string",
        "FirstName": "string",
        "LastName": "string",
        "BusinessID": "integer",
        "RoleID": "integer"
    }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### GET /users/:companyId
- **Description**: Sends list of all users at a specific company.
- **Parameters**: `companyId` (integer)
- **Responses**:
    - Success Response (200):
    ```json
    [
        {
            "UserID": "integer",
            "Username": "string",
            "FirstName": "string",
            "LastName": "string",
            "BusinessID": "integer",
            "RoleID": "integer"
        }, ...
    ]
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```

### DELETE /users/:userID
- **Description**: Deletes a user by UserID (Requires Authentication).
- **Parameters**: `userID` (integer)
- **Responses**:
    - Success Response (200):
    ```json
    { "success": true, "message": "User deleted successfully" }
    ```
    - Not Found Response (404):
    ```json
    { "success": false, "message": "User not found" }
    ```
    - Database Error (500):
    ```json
    { "error": "Database error occurred." }
    ```
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
