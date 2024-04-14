const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/products/";
const db = require("../config/dbConfig");
const {
  mockProductPostReq,
  mockProductPostRes,
  mockProductDbRow,
} = require("./constants/products");

jest.mock("../config/dbConfig", () => ({
    pool: {
        query: jest.fn(),
    },
    }));

describe("Product API routes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new product for POST /", async () => {
        const mockDbResponse = {
            insertId: 1,
        };
        const mockRequestBody = mockProductPostReq;
        console.log("mockRequestBody", mockRequestBody);
        db.pool.query.mockResolvedValueOnce([mockDbResponse]);
        const res = await request(app).post(BASE).send(mockRequestBody);
        console.log("res", res.body);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(mockProductPostRes);
    });

    it("should handle database errors for GET /:id", async () => {
        db.pool.query.mockImplementationOnce((sql, params, callback) => {
            callback(new Error("Database error"), null); // Simulate an error
        });
        const res = await request(app).get(BASE);
        expect(res.status).toBe(500);
        expect(res.body.error).toBeDefined();
    });

    it("should return a product for GET /:id", async () => {
        // Mock data that the route handler is expected to receive from the database
        const mockDBResponse = [mockProductDbRow];
        // Mock the query function to return the mockDbResult
        db.pool.query.mockResolvedValueOnce([mockDBResponse]);
        // Make the request to the API
        const res = await request(app).get(BASE + "1");
        expect(res.status).toBe(200);
        expect(res.body.data).toMatchObject({
            ProductID: expect.any(Number),
            Name: expect.any(String),
            Description: expect.any(String),
            UnitPrice: expect.any(Number),
        });
    });
});