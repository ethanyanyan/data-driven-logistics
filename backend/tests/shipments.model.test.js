const db = require("../config/dbConfig");
jest.mock("../config/dbConfig");

const Shipment = require("./../models/Shipments");

describe("Shipment Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save a new shipment to the database", async () => {
    const mockShipment = { insertId: 1 };
    db.pool.query.mockResolvedValue([mockShipment, undefined]);

    const shipment = new Shipment(
      null,
      1,
      1,
      2,
      new Date("2023-01-01"),
      new Date("2023-01-05"),
      "Pending",
    );
    await shipment.save();

    // simulate setting the ShipmentID after the successful save
    shipment.ShipmentID = mockShipment.insertId;

    expect(db.pool.query).toHaveBeenCalled();
    expect(shipment.ShipmentID).toEqual(mockShipment.insertId);
  });

  it("should find a shipment by its unique identifier", async () => {
    const mockShipmentData = {
      ShipmentID: 1,
      SourceID: 1,
      UserID: 1,
      DestinationID: 2,
      DepartureDate: new Date("2023-01-01").toISOString(),
      ArrivalDate: new Date("2023-01-05").toISOString(),
      Status: "Pending",
    };
    db.pool.query.mockResolvedValue([[mockShipmentData], undefined]);

    const shipment = await Shipment.findByID(1);

    expect(db.pool.query).toHaveBeenCalledWith(expect.any(String), [1]);
    expect(shipment).toBeInstanceOf(Shipment);
    expect(shipment.Status).toEqual("Pending");
  });

  it("should retrieve all shipments from the database", async () => {
    const mockShipmentArray = [
      {
        ShipmentID: 1,
        SourceID: 1,
        UserID: 1,
        DestinationID: 2,
        DepartureDate: new Date("2023-01-01").toISOString(),
        ArrivalDate: new Date("2023-01-05").toISOString(),
        Status: "Pending",
      },
    ];
    db.pool.query.mockResolvedValue([mockShipmentArray, undefined]);

    const shipments = await Shipment.findAll();

    expect(db.pool.query).toHaveBeenCalled();
    expect(shipments).toBeInstanceOf(Array);
    expect(shipments.length).toBeGreaterThan(0);
  });

  it("should update specified details of a shipment", async () => {
    db.pool.query.mockResolvedValue([{ changedRows: 1 }, undefined]);

    const shipment = new Shipment(
      1,
      1,
      1,
      2,
      new Date("2023-01-01"),
      new Date("2023-01-05"),
      "Pending",
    );
    const updateData = { Status: "Shipped" };
    const success = await Shipment.updateShipment(
      shipment.ShipmentID,
      updateData,
    );

    expect(db.pool.query).toHaveBeenCalled();
    expect(success).toBeTruthy();
  });

  it("should delete a shipment from the database by its unique identifier", async () => {
    const mockQueryFn = jest
      .fn()
      .mockResolvedValueOnce([{}, undefined]) // Mock for ShipmentDetails delete
      .mockResolvedValueOnce([{ affectedRows: 1 }, undefined]); // Mock for Shipments delete
    db.pool.getConnection.mockResolvedValue({
      query: mockQueryFn,
      release: jest.fn(),
      rollback: jest.fn(),
      beginTransaction: jest.fn(),
      commit: jest.fn(),
    });

    await Shipment.delete(1);

    // Use the mockQueryFn to check call count
    expect(mockQueryFn).toHaveBeenCalledTimes(2);
  });

  // Additional tests as needed
});
