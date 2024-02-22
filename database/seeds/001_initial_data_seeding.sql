-- Insert Roles
INSERT INTO Roles (RoleName, Description) VALUES
('Admin', 'System administrator with full access'),
('Manager', 'Can manage orders and view reports'),
('Employee', 'Can view shipments and inventory');

-- Insert Businesses
INSERT INTO Businesses (BusinessName, Description) VALUES
('Acme Corporation', 'An example business specializing in automotive manufacturing');

-- Insert Users
INSERT INTO Users (BusinessID, RoleID, Username, Password, FirstName, LastName) VALUES
(1, 1, 'adminUser', 'encrypted_password', 'Admin', 'User'),
(1, 2, 'managerUser', 'encrypted_password', 'Manager', 'User');

-- Insert LocationTypes
INSERT INTO LocationTypes (Name) VALUES
('Warehouse'),
('Retail Outlet');

-- Insert Locations
INSERT INTO Locations (BusinessID, TypeID, Latitude, Longitude) VALUES
(1, 1, '40.7128', '-74.0060'),
(1, 2, '34.0522', '-118.2437');

-- Insert Products
INSERT INTO Products (Name, Description, UnitPrice) VALUES
('Engine Block', 'V8 Engine Block', 1200.00),
('Windshield', 'Front Windshield', 200.00);

-- Insert Shipments
INSERT INTO Shipments (SourceID, DestinationID, DepartureDate, ArrivalDate, Status) VALUES
(1, 2, '2023-01-10', '2023-01-12', 'Delivered');

-- Insert ShipmentDetails
INSERT INTO ShipmentDetails (ShipmentID, ProductID, Quantity) VALUES
(1, 1, 10),
(1, 2, 20);

-- Insert InventoryLevels
INSERT INTO InventoryLevels (LocationID, ProductID, Quantity) VALUES
(1, 1, 100),
(1, 2, 200);

-- Insert TransactionTypes
INSERT INTO TransactionTypes (Name) VALUES
('Addition'),
('Subtraction'),
('Adjustment');

-- Insert Transactions
INSERT INTO Transactions (ItemID, LocationID, TypeID, Quantity, Date, UserID) VALUES
(1, 1, 1, 50, '2023-01-01', 1),
(2, 1, 3, -10, '2023-01-02', 2);
