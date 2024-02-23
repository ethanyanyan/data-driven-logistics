```mermaid
%% Class Diagram
classDiagram
    class User {
        -UserID: string
        -Username: string
        -Password: string
        -FirstName: string
        -LastName: string
        +authenticateUser()
    }
    class Role {
        -RoleID: string
        -RoleName: string
        -Description: string
    }
    class Business {
        -BusinessID: string
        -BusinessName: string
        -Description: string
    }
    class Location {
        -LocationID: string
        -Latitude: string
        -Longitude: string
        +getInventoryLevels()
    }
    class Product {
        -ProductID: string
        -Name: string
        -Description: string
        -UnitPrice: float
    }
    class Shipment {
        -ShipmentID: string
        -DepartureDate: date
        -ArrivalDate: date
        -Status: string
        +recordShipment()
        +getShipments()
    }
    class ShipmentDetail {
        -ShipmentDetailID: string
        -Quantity: int
    }
    class InventoryLevel {
        -InventoryLevelID: string
        -Quantity: int
        +updateQuantity()
    }
    class Transaction {
        -TransactionID: string
        -Quantity: int
        -Date: date
        +logInteraction()
    }
    class TransactionType {
        -TypeID: string
        -Name: string
    }
    class Report {
        +generateReport()
    }
    class UserInterface {
        +displayDashboard()
    }

    User "1" -- "*" Role : has
    User "1" -- "*" Business : belongs to
    Business "1" -- "*" Location : has
    Location "1" -- "*" Product : tracked in
    Shipment "1" -- "*" ShipmentDetail : includes
    Product "1" -- "*" ShipmentDetail : contained in
    Location "1" o-- "*" Shipment : source
    Location "1" o-- "*" Shipment : destination
    User "1" -- "*" Transaction : performs
    Product "1" -- "*" Transaction : involves
    Location "1" -- "*" Transaction : occurs at
    TransactionType "1" -- "*" Transaction : is a type of
    Report "1" -- "*" InventoryLevel : generates from
    UserInterface "1" -- "*" User : displays
    UserInterface "1" -- "*" Product : displays
    UserInterface "1" -- "*" Shipment : displays
    UserInterface "1" -- "*" Report : displays
    
  ```
