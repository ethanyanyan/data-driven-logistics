# API Documentation for My Express.js Project

Base URL: `http://localhost:3001/api/v1/`

## Table of Contents
- [Companies](#companies)
- [Inventory](#inventory)
- [Location Types](#location-types)
- [Locations](#locations)
- [Products](#products)
- [Roles](#roles)
- [Shipments](#shipments)
- [Testing](#testing)
- [Users](#users)

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
     Database Error (500):
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
