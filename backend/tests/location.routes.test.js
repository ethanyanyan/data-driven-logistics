const request = require("supertest");
const app = require("../index"); // Make sure this points to your Express app's entry point
const BASE = "/api/v1/locations/";

describe("LocationAPIs", () => {
  it("should create a location and return 201", async () => {
    // Mock the location creation data
    const locationData = {BusinessID: 1, TypeID:1, Latitude: "1.23", Longitude: "4.56"};

    const res = await request(app).post(BASE).send(locationData);
    expect(res.status).toBe(201); // Assuming 201 is the success status code for creation
    expect(res.body).toHaveProperty('message', 'Location created successfully');
  });

  it("should return a location and status 200 if found", async () => {
    const res = await request(app).get(BASE + '1'); // Assuming '1' is a valid location ID
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Location retrieved successfully');
  });

  it("should update a location and return 200", async () => {
    const unixTime = Date.now();
    const scaledLatitude = ((unixTime % 100000) / 100000) * 180 - 90;

    const updateData = { BusinessID: 1, TypeID:1, Latitude: scaledLatitude.toString(), Longitude: "5.6789" };

    const res = await request(app).put(BASE + '1').send(updateData);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Location updated successfully');
  });

  it("should return 404 when updating a non-existent location", async () => {
    const updateData = { BusinessID: 1, TypeID:1, Latitude: "2.34", Longitude: "5.67" };

    const res = await request(app).put(BASE + '9999').send(updateData); // Assuming 9999 is a non-existent ID
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Location not found');
  });

  it("should create and then delete a location, returning 200", async () => {
    // First, create a location to delete
    const locationData = { BusinessID: 1, TypeID:1, Latitude: "1.23", Longitude: "4.56" };
    const createRes = await request(app).post(BASE).send(locationData);
    expect(createRes.status).toBe(201);
    const locationId = createRes.body.data.insertId; // Assuming the POST response includes the new location's ID
    
    // Now delete the location
    const deleteRes = await request(app).delete(BASE + locationId);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty('message', 'Location deleted successfully');
  });

  it("should return 404 when deleting a non-existent location", async () => {
    const res = await request(app).delete(BASE + '9999'); // Assuming 9999 is a non-existent ID
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Location not found');
  });
});
