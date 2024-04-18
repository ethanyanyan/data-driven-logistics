-- Drop tables if they exist (order matters due to foreign keys)
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS InventoryLevels;
DROP TABLE IF EXISTS ShipmentDetails;
DROP TABLE IF EXISTS Shipments;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Locations;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Businesses;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS LocationTypes;
DROP TABLE IF EXISTS TransactionTypes;

-- Create Roles Table
CREATE TABLE Roles (
    RoleID INT AUTO_INCREMENT PRIMARY KEY,
    RoleName VARCHAR(255) NOT NULL,
    Description TEXT
);

-- Create Businesses Table
CREATE TABLE Businesses (
    BusinessID INT AUTO_INCREMENT PRIMARY KEY,
    BusinessName VARCHAR(255) NOT NULL,
    Description TEXT
);

-- Create Users Table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    BusinessID INT,
    RoleID INT,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    FOREIGN KEY (BusinessID) REFERENCES Businesses(BusinessID),
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);

-- Create LocationTypes Table
CREATE TABLE LocationTypes (
    TypeID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Create Locations Table
CREATE TABLE Locations (
    LocationID INT AUTO_INCREMENT PRIMARY KEY,
    BusinessID INT,
    TypeID INT,
    Latitude DECIMAL(9,6),
    Longitude DECIMAL(9,6),
    FOREIGN KEY (BusinessID) REFERENCES Businesses(BusinessID),
    FOREIGN KEY (TypeID) REFERENCES LocationTypes(TypeID)
);

-- Create Products Table
CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    UnitPrice DECIMAL(10,2)
);

-- Create Shipments Table
CREATE TABLE Shipments (
    ShipmentID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    SourceID INT,
    DestinationID INT,
    DepartureDate DATE,
    ArrivalDate DATE,
    StatusID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID), 
    FOREIGN KEY (SourceID) REFERENCES Locations(LocationID),
    FOREIGN KEY (DestinationID) REFERENCES Locations(LocationID)
);

-- Create ShipmentStatusType Table
CREATE TABLE ShipmentStatusType (
    StatusID INT AUTO_INCREMENT PRIMARY KEY,
    StatusName VARCHAR(255) NOT NULL
);

-- Create ShipmentDetails Table
CREATE TABLE ShipmentDetails (
    ShipmentDetailID INT AUTO_INCREMENT PRIMARY KEY,
    ShipmentID INT,
    ProductID INT,
    Quantity INT,
    FOREIGN KEY (ShipmentID) REFERENCES Shipments(ShipmentID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Create InventoryLevels Table
CREATE TABLE InventoryLevels (
    InventoryLevelID INT AUTO_INCREMENT PRIMARY KEY,
    LocationID INT,
    ProductID INT,
    Quantity INT,
    FOREIGN KEY (LocationID) REFERENCES Locations(LocationID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Create TransactionTypes Table
CREATE TABLE TransactionTypes (
    TypeID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Create Transactions Table
CREATE TABLE Transactions (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    ItemID INT,
    LocationID INT,
    TypeID INT,
    Quantity INT,
    Date DATE,
    UserID INT,
    FOREIGN KEY (ItemID) REFERENCES Products(ProductID),
    FOREIGN KEY (LocationID) REFERENCES Locations(LocationID),
    FOREIGN KEY (TypeID) REFERENCES TransactionTypes(TypeID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
