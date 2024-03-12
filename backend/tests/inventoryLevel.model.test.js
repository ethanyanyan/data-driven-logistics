const db = require("../config/dbConfig");
jest.mock("../config/dbConfig");

const InventoryLevel = require("./../models/InventoryLevel");

describe("InventoryLevel Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save a new inventory level to the database", async () => {
    const mockInventoryLevel = { insertId: 1 };
    db.pool.query.mockResolvedValue([mockInventoryLevel, undefined]);

    const inventoryLevel = new InventoryLevel(null, 1, 1, 100);
    await inventoryLevel.save();

    expect(db.pool.query).toHaveBeenCalled();
    expect(inventoryLevel.InventoryLevelID).toEqual(
      mockInventoryLevel.insertId,
    );
  });

  it("should update the quantity of an inventory level", async () => {
    db.pool.query.mockResolvedValue([{ changedRows: 1 }, undefined]);

    const inventoryLevel = new InventoryLevel(1, 1, 1, 100);
    const newQuantity = 150;
    const success = await inventoryLevel.updateQuantity(newQuantity);

    expect(db.pool.query).toHaveBeenCalled();
    expect(success).toBeTruthy();
    expect(inventoryLevel.Quantity).toEqual(newQuantity);
  });

  it("should find inventory levels by location and product", async () => {
    const mockInventoryData = {
      InventoryLevelID: 1,
      LocationID: 1,
      ProductID: 1,
      Quantity: 100,
    };
    db.pool.query.mockResolvedValue([[mockInventoryData], undefined]);

    const inventoryLevel = await InventoryLevel.findByLocationAndProduct(1, 1);

    expect(db.pool.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);
    expect(inventoryLevel).toBeInstanceOf(InventoryLevel);
    expect(inventoryLevel.Quantity).toEqual(100);
  });

  it("should adjust the quantity of an inventory level by a specified amount", async () => {
    const startingQuantity = 100;
    const adjustAmount = -20;
    const expectedQuantity = 80;

    db.pool.query.mockResolvedValue([{ changedRows: 1 }, undefined]);

    const inventoryLevel = new InventoryLevel(1, 1, 1, startingQuantity);
    const success = await inventoryLevel.adjustQuantity(adjustAmount);

    expect(db.pool.query).toHaveBeenCalled();
    expect(success).toBeTruthy();
    expect(inventoryLevel.Quantity).toEqual(expectedQuantity);
  });

  // Additional tests as needed
});
