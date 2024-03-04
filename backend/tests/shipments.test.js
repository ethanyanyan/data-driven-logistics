const request = require("supertest");
const app = require("../index"); // Import your Express app

describe("API routes", () => {
  let db;

  beforeAll(async () => {
    // Set up database connection for tests
    db = require("../config/dbConfig");
    await db.getConnection();
  });

  afterAll(async () => {
    // Close database connection after tests
    if (db) {
      await db.pool.end();
    }
  });

  test("GET / should return all shipments", async () => {
    const res = await request(app).get("/api/v1/shipments");
    expect(res.statusCode).toEqual(200);
    // Add more assertions based on your specific requirements
  });

  test("GET /:id should return a shipment", async () => {
    const res = await request(app).get("/api/v1/shipments/22");
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("ShipmentID");
    // Add more assertions based on your specific requirements
  });

  test("POST / should create a new shipment", async () => {
    const newShipment = {
      SourceID: 1,
      DestinationID: 2,
      DepartureDate: "2023-01-10",
      ArrivalDate: "2023-01-12",
      Status: "Delivered",
    };
    const res = await request(app).post("/api/v1/shipments").send(newShipment);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("ShipmentId");
    // Add more assertions based on your specific requirements
  });

  // Create one for failing post with an invalid body
  // NOTE: Testcase fails. No typecheck for backend yet
    test("POST / should fail with invalid body", async () => {
        const newShipment = {
        SourceID: "1", // shd be integer
        DepartureDate: "2023-01-10",
        ArrivalDate: "2023-01-12",
        Status: "Delivered",
        };
        const res = await request(app).post("/api/v1/shipments").send(newShipment);
        expect(res.statusCode).toEqual(400);
        // Add more assertions based on your specific requirements
    });
});
