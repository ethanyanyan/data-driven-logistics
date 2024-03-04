-- Insert Roles
INSERT INTO Roles (RoleName, Description) VALUES
('Admin', 'System administrator with full access'),
('Manager', 'Can manage orders and view reports'),
('Employee', 'Can view shipments and inventory');

-- Insert Businesses
INSERT INTO Businesses (BusinessName, Description) VALUES
('Acme Corporation', 'An example business specializing in automotive manufacturing'),
("FastTrack Motors", "A leading company in the sports car manufacturing sector, known for its high-performance vehicles and innovative design."),
("EcoDrive Innovations", "Specializes in electric vehicle (EV) technology, producing eco-friendly cars with cutting-edge electric engines."),
("Luxury Autos Inc.", "A luxury automobile manufacturer that combines state-of-the-art technology with premium design to create exclusive vehicles."),
("HeavyDuty Trucks Co.", "Focuses on the production of commercial vehicles, particularly heavy trucks for transportation and logistics solutions.");

-- Insert Users
INSERT INTO Users (BusinessID, RoleID, Username, Password, FirstName, LastName) VALUES
(1, 1, 'adminUser', 'encrypted_password', 'Admin', 'User'),
(1, 2, 'managerUser', 'encrypted_password', 'Manager', 'User');

-- Insert LocationTypes
INSERT INTO LocationTypes (Name) VALUES
('Warehouse'),
('Retail Outlet'),
('Repair Shop');

-- Insert Locations
INSERT INTO Locations (BusinessID, TypeID, Latitude, Longitude) VALUES
(1, 1, '40.7128', '-74.0060'),
(1, 2, '34.0522', '-118.2437'),
(1, 3, '37.1473', '18.2298'),
(2, 1, '51.5074', '-0.1278'),
(2, 2, '48.8566', '2.3522'),
(2, 3, '-33.8688', '151.2093'),
(3, 1, '35.6895', '139.6917'),
(3, 2, '-23.5505', '-46.6333'),
(3, 3, '55.7558', '37.6173');

-- Insert Products
INSERT INTO Products (Name, Description, UnitPrice) VALUES
('Engine Block', 'V8 Engine Block', 1200.00),
('Windshield', 'Front Windshield', 200.00),
('Tire Set', 'All-season Radial Tires', 400.00),
('Brake Pads', 'Ceramic Brake Pads Set', 150.00),
('Headlights', 'LED Headlight Bulbs', 250.00),
('Car Battery', '12V Automotive Battery', 95.00),
('Exhaust System', 'Stainless Steel Performance Exhaust', 600.00);

-- Insert Shipments
INSERT INTO Shipments (SourceID, DestinationID, DepartureDate, ArrivalDate, Status) VALUES
(1, 2, '2023-01-10', '2023-01-12', 'Delivered'),
(2, 3, '2023-01-11', '2023-01-13', 'Delivered'),
(1, 3, '2023-01-12', '2023-01-15', 'Delivered');

-- Insert ShipmentDetails
INSERT INTO ShipmentDetails (ShipmentID, ProductID, Quantity) VALUES
(1, 1, 10),
(1, 2, 20),
(2, 1, 30);

-- Insert InventoryLevels
INSERT INTO InventoryLevels (LocationID, ProductID, Quantity) VALUES
(1, 1, 100),
(1, 2, 200),
(1, 3, 300),
(2, 1, 50),
(2, 2, 150),
(2, 3, 250),
(3, 1, 100),
(3, 2, 240),
(3, 3, 120);

-- Insert TransactionTypes
INSERT INTO TransactionTypes (Name) VALUES
('Addition'),
('Subtraction'),
('Adjustment');

-- Insert Transactions
INSERT INTO Transactions (ItemID, LocationID, TypeID, Quantity, Date, UserID) VALUES
(1, 1, 1, 50, '2023-01-01', 1),
(2, 1, 3, -10, '2023-01-02', 2),
(3, 2, 1, -40, '2023-01-03', 1),
(3, 2, 2, 20, '2023-01-04', 2);