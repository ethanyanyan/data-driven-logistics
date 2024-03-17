const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/inventory/";
const db = require("../config/dbConfig");
const InventoryLevel = require("./../models/InventoryLevel");
const {
  mockInventoryPostReq,
  mockInventoryPostRes,
  mockInventoryDbAllRows,
  mockInventoryDbRow,
  mockInventoryDeleteRes,
} = require("./constants/inventory");

jest.mock("../config/dbConfig", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("Inventory API routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new item in the inventory for POST /", async () => {
    const mockDbResponse = {
      insertId: 1,
    };
    const mockRequestBody = mockInventoryPostReq;

    db.pool.query.mockResolvedValueOnce([mockDbResponse]);
    const res = await request(app).post(BASE).send(mockRequestBody);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(mockInventoryPostRes);
  });

  it("should handle database errors for GET /:id", async () => {
    db.pool.query.mockImplementationOnce((sql, params, callback) => {
      callback(new Error("Database error"), null); // Simulate an error
    });
    const res = await request(app).get(BASE);
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });

  it("should return a inventory for GET /:id", async () => {
    // Mock data that the route handler is expected to receive from the database
    const mockDBResponse = [mockInventoryDbRow];
    // Mock the query function to return the mockDbResult
    db.pool.query.mockResolvedValueOnce([mockDBResponse]);
    // Make the request to the API
    const res = await request(app).get(BASE + "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      InventoryLevelID: expect.any(Number),
      LocationID: expect.any(Number),
      ProductID: expect.any(Number),
      Quantity: expect.any(Number),
    });
  });

  it("Should return all inventory for GET /", async () => {
    const mockApiResponse = mockInventoryDbAllRows;
    db.pool.query.mockResolvedValueOnce([mockApiResponse]);
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it("should delete an inventory for DELETE /:id", async () => {
    db.pool.query.mockResolvedValueOnce([[mockInventoryDbRow]]); // Mock findById
    db.pool.query.mockResolvedValueOnce([mockInventoryDeleteRes]); // Mock delete
    const res = await request(app).delete(BASE + "1");
    expect(res.body.message).toBe("InventoryLevel id 1 deleted successfully");
    expect(res.status).toBe(200);
  });
});
