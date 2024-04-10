const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/shipments/";
const db = require("../config/dbConfig");

jest.mock("../config/dbConfig", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("Shipment API routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle database errors for GET /:id", async () => {
    db.pool.query.mockImplementationOnce((sql, params, callback) => {
      callback(new Error("Database error"), null); // Simulate an error
    });

    const res = await request(app).get(BASE);
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });

  it("should return a shipment for GET /:id", async () => {
    // Mock data that the route handler is expected to receive from the database
    const mockApiResponse = [
      {
        ShipmentID: 1,
        SourceID: 1,
        DestinationID: 2,
        DepartureDate: "2023-01-10T00:00:00.000Z",
        ArrivalDate: "2023-01-12T00:00:00.000Z",
        Status: "Delivered",
      },
    ];

    // Mock the query function to return the mockDbResult
    db.pool.query.mockResolvedValueOnce([mockApiResponse]);

    // Make the request to the API
    const res = await request(app).get(BASE + "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      ShipmentID: expect.any(Number),
      SourceID: expect.any(Number),
      DestinationID: expect.any(Number),
      DepartureDate: expect.any(String),
      ArrivalDate: expect.any(String),
      Status: expect.any(String),
    });
  });

  it("Should return all shipment for GET /", async () => {
    const mockApiResponse = [
      {
        ShipmentID: 1,
        SourceID: 1,
        DestinationID: 2,
        DepartureDate: "2023-01-10T00:00:00.000Z",
        ArrivalDate: "2023-01-12T00:00:00.000Z",
        Status: "Delivered",
      },
      {
        ShipmentID: 2,
        SourceID: 1,
        DestinationID: 2,
        DepartureDate: "2023-01-10T00:00:00.000Z",
        ArrivalDate: "2023-01-12T00:00:00.000Z",
        Status: "Delivered",
      },
    ];

    db.pool.query.mockResolvedValueOnce([mockApiResponse]);

    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    for (let shipment of res.body.data) {
      expect(shipment).toMatchObject({
        ShipmentID: expect.any(Number),
        SourceID: expect.any(Number),
        DestinationID: expect.any(Number),
        DepartureDate: expect.any(String),
        ArrivalDate: expect.any(String),
        Status: expect.any(String),
      });
    }
  });

  it("should handle database errors for POST /", async () => {
    db.pool.query.mockImplementationOnce((sql, params, callback) => {
      callback(new Error("Database error"), null); // Simulate an error
    });

    const res = await request(app).post(BASE);
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });

  it("should create a new shipment for POST /", async () => {
    const mockApiResponse = {
      ShipmentID: 1,
      SourceID: 1,
      UserID: 1,
      DestinationID: 2,
      DepartureDate: "2023-01-15",
      ArrivalDate: "2023-01-19",
      Status: "Delivered",
    };

    const postData = {
      SourceID: 1,
      UserID: 1,
      DestinationID: 2,
      DepartureDate: "2023-01-15",
      ArrivalDate: "2023-01-19",
      Status: "Delivered",
    };

    db.pool.query.mockResolvedValueOnce([mockApiResponse]);

    const res = await request(app).post(BASE).send(postData);
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      ShipmentID: expect.any(Number),
      SourceID: expect.any(Number),
      UserID: expect.any(Number),
      DestinationID: expect.any(Number),
      DepartureDate: expect.any(String),
      ArrivalDate: expect.any(String),
      Status: expect.any(String),
    });
  });
});
