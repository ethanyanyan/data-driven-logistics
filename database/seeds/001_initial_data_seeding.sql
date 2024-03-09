-- Insert Roles
INSERT INTO Roles (RoleName, Description) VALUES
('Admin', 'System administrator with full access'),
('Corporate Manager', 'Manages corporate strategy and oversees all facilities.'), 
('Facility Manager', 'Manages day-to-day operations of a single facility.');

-- Insert Businesses
INSERT INTO Businesses (BusinessName, Description) VALUES
('Tech Innovations', 'A leading provider of innovative tech solutions, specializing in consumer electronics and software services.'),
('Green Earth Supplies', 'A company dedicated to sustainable living, offering eco-friendly products and green technology solutions.'),
('Global Logistics Inc.', 'An international logistics company offering comprehensive freight and supply chain management services.'),
('Health & Wellness Retail', 'A retailer focused on health and wellness products, including supplements, fitness equipment, and organic foods.'),
('Creative Solutions Agency', 'A creative agency offering marketing, advertising, and brand development services for businesses of all sizes.');


-- Insert Users
INSERT INTO Users (BusinessID, RoleID, Username, Password, FirstName, LastName) VALUES
(1, 1, 'adminUser', 'encrypted_password', 'Admin', 'User'),
(1, 2, 'managerUser', 'encrypted_password', 'Manager', 'User');

-- Insert LocationTypes
INSERT INTO LocationTypes (Name) VALUES 
('Warehouse'), 
('Retail Outlet'), 
('Distribution Center');

-- Insert Locations
INSERT INTO Locations (BusinessID, TypeID, Latitude, Longitude) VALUES
-- Insert Locations for Tech Innovations
(1, 1, '37.7749', '-122.4194'), 
(1, 2, '34.0522', '-118.2437'), 
(1, 3, '36.7783', '-119.4179'), 

-- Insert Locations for Green Earth Supplies
(2, 1, '40.7128', '-74.0060'), 
(2, 2, '39.9526', '-75.1652'), 
(2, 3, '42.3601', '-71.0589'), 

-- Insert Locations for Global Logistics Inc.
(3, 1, '51.5074', '-0.1278'), 
(3, 2, '52.4862', '-1.8904'),
(3, 3, '53.4808', '-2.2426'),

-- Insert Locations for Health & Wellness Retail
(4, 1, '52.5200', '13.4050'),
(4, 2, '48.1351', '11.5820'), 
(4, 3, '50.1109', '8.6821'),

-- Insert Locations for Creative Solutions Agency
(5, 1, '35.6895', '139.6917'), 
(5, 2, '34.6937', '135.5023'), 
(5, 3, '35.0116', '135.7681'); 

-- Insert Products
INSERT INTO Products (Name, Description, UnitPrice) VALUES
('Smartphone', 'Latest model with advanced features.', 999.99),
('Laptop', 'High-performance laptop suitable for both work and play.', 1299.99),
('Eco-Friendly Water Bottle', 'Sustainable and reusable water bottle made from recycled materials.', 19.99),
('Organic Green Tea', 'Certified organic green tea, sourced from sustainable farms.', 4.99),
('Yoga Mat', 'Eco-friendly, non-toxic yoga mat perfect for all levels of yoga practitioners.', 29.99),
('Running Shoes', 'Lightweight and durable running shoes for all types of runners.', 89.99),
('Bluetooth Headphones', 'Wireless headphones with noise cancellation and long battery life.', 199.99),
('LED Light Bulb', 'Energy-efficient LED light bulb that lasts up to 10 years.', 3.99),
('Backpack', 'Versatile backpack suitable for travel, work, or school.', 59.99),
('Fitness Tracker', 'Wearable fitness tracker that monitors your activity and health metrics.', 149.99);


-- Insert Shipments
INSERT INTO Shipments (UserID, SourceID, DestinationID, DepartureDate, ArrivalDate, Status) VALUES
(1, 1, 2, '2023-10-01', '2023-10-03', 'Completed'),
(1, 3, 4, '2023-10-05', '2023-10-08', 'In Transit'),
(1, 5, 6, '2023-10-10', '2023-10-12', 'Completed'),
(1, 7, 8, '2023-10-15', '2023-10-17', 'Delayed'),
(1, 9, 10, '2023-10-20', '2023-10-22', 'In Transit');


-- Insert ShipmentDetails
INSERT INTO ShipmentDetails (ShipmentID, ProductID, Quantity) VALUES
(1, 1, 100), -- 100 units of ProductID 1 in Shipment 1
(1, 2, 50),  -- 50 units of ProductID 2 in Shipment 1
(2, 3, 200), -- 200 units of ProductID 3 in Shipment 2
(3, 4, 300), -- 300 units of ProductID 4 in Shipment 3
(4, 5, 120), -- 120 units of ProductID 5 in Shipment 4
(5, 6, 90);  -- 90 units of ProductID 6 in Shipment 5


-- Insert InventoryLevels
INSERT INTO InventoryLevels (LocationID, ProductID, Quantity) VALUES
-- Inventory for Location 1
(1, 1, 150), -- 150 units of ProductID 1
(1, 2, 200), -- 200 units of ProductID 2
(1, 3, 100), -- 100 units of ProductID 3

-- Inventory for Location 2
(2, 4, 250), -- 250 units of ProductID 4
(2, 5, 75),  -- 75 units of ProductID 5
(2, 6, 90),  -- 90 units of ProductID 6

-- Inventory for Location 3
(3, 7, 200), -- 200 units of ProductID 7
(3, 8, 300), -- 300 units of ProductID 8
(3, 9, 50),  -- 50 units of ProductID 9

-- Inventory for Location 4
(4, 1, 100), -- 100 units of ProductID 1 again, but in a different location
(4, 10, 60), -- 60 units of ProductID 10
(4, 3, 150); -- 150 units of ProductID 3 again, in a different location


-- Insert TransactionTypes
INSERT INTO TransactionTypes (Name) VALUES
('Addition'),
('Subtraction'),
('Adjustment');

-- Insert Transactions
INSERT INTO Transactions (ItemID, LocationID, TypeID, Quantity, Date, UserID) VALUES
-- Transactions for Location 1
(1, 1, 1, 50, '2023-10-01', 1), -- Addition of 50 units of ProductID 1 at LocationID 1 by Admin
(2, 1, 2, 20, '2023-10-02', 2), -- Subtraction of 20 units of ProductID 2 at LocationID 1 by Corporate Manager
(3, 1, 3, 30, '2023-10-03', 3), -- Adjustment (could be either addition or subtraction, implied addition here) of 30 units of ProductID 3 at LocationID 1 by Facility Manager

-- Transactions for Location 2
(4, 2, 1, 100, '2023-10-04', 1), -- Addition of 100 units of ProductID 4 at LocationID 2
(5, 2, 2, 50, '2023-10-05', 2),  -- Subtraction of 50 units of ProductID 5 at LocationID 2
(6, 2, 3, 25, '2023-10-06', 3),  -- Adjustment of 25 units of ProductID 6 at LocationID 2

-- Transactions for Location 3
(7, 3, 1, 75, '2023-10-07', 1),  -- Addition of 75 units of ProductID 7 at LocationID 3
(8, 3, 2, 35, '2023-10-08', 2),  -- Subtraction of 35 units of ProductID 8 at LocationID 3
(9, 3, 3, 15, '2023-10-09', 3);  -- Adjustment of 15 units of ProductID 9 at LocationID 3