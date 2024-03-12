const db = require("../config/dbConfig");
jest.mock("../config/dbConfig");

const Location = require("./../models/Location"); 

describe("Location Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save a new location to the database", async () => {
    const mockLocation = { insertId: 1 };
    db.pool.query.mockResolvedValue([mockLocation, undefined]);

    const location = new Location(null, 1, "123.456", "-123.456");
    await location.save();

    expect(db.pool.query).toHaveBeenCalled();
    expect(location.LocationID).toEqual(mockLocation.insertId);
  });

  it("should find a location by its unique identifier", async () => {
    const mockLocationData = {
      LocationID: 1,
      BusinessID: 1,
      Latitude: "123.456",
      Longitude: "-123.456",
    };
    db.pool.query.mockResolvedValue([[mockLocationData], undefined]);

    const location = await Location.findByID(1);

    expect(db.pool.query).toHaveBeenCalledWith(expect.any(String), [1]);
    expect(location).toBeInstanceOf(Location);
    expect(location.Latitude).toEqual("123.456");
  });

  it("should update specified details of a location", async () => {
    db.pool.query.mockResolvedValue([{ changedRows: 1 }, undefined]);

    const location = new Location(1, 1, "123.456", "-123.456");
    const updateData = { Latitude: "654.321" };
    const success = await location.update(updateData);

    expect(db.pool.query).toHaveBeenCalled();
    expect(success).toBeTruthy();
    expect(location.Latitude).toEqual("654.321");
  });

  it("should delete a location from the database by its unique identifier", async () => {
    const mockConnection = {
      query: jest.fn().mockResolvedValueOnce([{}, undefined]) // Mock for cascading delete
                     .mockResolvedValueOnce([{}, undefined]) // Another mock for cascading delete
                     .mockResolvedValueOnce([{ affectedRows: 1 }, undefined]), // Mock for Location delete
      release: jest.fn(),
      rollback: jest.fn(),
      beginTransaction: jest.fn(),
      commit: jest.fn(),
    };
    db.pool.getConnection.mockResolvedValue(mockConnection);

    const location = new Location(1, 1, "123.456", "-123.456");
    const success = await location.delete();

    // Since delete involves a transaction, check the mockConnection methods
    expect(mockConnection.query).toHaveBeenCalledTimes(3); // Adjust based on actual delete operation steps
    expect(success).toBeTruthy();
  });

  // Additional tests as needed for other methods and functionalities
});
