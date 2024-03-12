const db = require("../config/dbConfig");
jest.mock("../config/dbConfig");

const Product = require("./../models/Product");

describe("Product Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save a new product to the database", async () => {
    const mockProduct = { insertId: 1 };
    db.pool.query.mockResolvedValue([mockProduct, undefined]);

    const product = new Product(
      null,
      "Test Product",
      "Description of test product",
      9.99,
    );
    await product.save();

    expect(db.pool.query).toHaveBeenCalled();
    expect(product.ProductID).toEqual(mockProduct.insertId);
  });

  it("should find a product by its unique identifier", async () => {
    const mockProductData = {
      ProductID: 1,
      Name: "Test Product",
      Description: "Description of test product",
      UnitPrice: 9.99,
    };
    db.pool.query.mockResolvedValue([[mockProductData], undefined]);

    const product = await Product.findByID(1);

    expect(db.pool.query).toHaveBeenCalledWith(expect.any(String), [1]);
    expect(product).toBeInstanceOf(Product);
    expect(product.Name).toEqual("Test Product");
  });

  it("should update specified details of a product", async () => {
    db.pool.query.mockResolvedValue([{ changedRows: 1 }, undefined]);

    const product = new Product(
      1,
      "Test Product",
      "Description of test product",
      9.99,
    );
    const updateData = { Name: "Updated Product Name" };
    await product.update(updateData);

    expect(db.pool.query).toHaveBeenCalled();
    expect(product.Name).toEqual("Updated Product Name");
  });

  it("should delete a product from the database by its unique identifier", async () => {
    const mockConnection = {
      query: jest
        .fn()
        .mockResolvedValueOnce([{}, undefined]) // Mock for ShipmentDetails delete
        .mockResolvedValueOnce([{}, undefined]) // Mock for InventoryLevels delete
        .mockResolvedValueOnce([{ affectedRows: 1 }, undefined]), // Mock for Product delete
      release: jest.fn(),
      rollback: jest.fn(),
      beginTransaction: jest.fn(),
      commit: jest.fn(),
    };

    db.pool.getConnection.mockResolvedValue(mockConnection);

    const product = new Product(
      1,
      "Test Product",
      "Description of test product",
      9.99,
    );
    const result = await product.delete();

    expect(mockConnection.query).toHaveBeenCalledTimes(3);
    expect(result).toHaveProperty("affectedRows", 1);
  });

  // Additional tests as needed
});
