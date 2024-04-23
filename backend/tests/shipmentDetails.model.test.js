const db = require("../config/dbConfig");
jest.mock("../config/dbConfig");

const ShipmentDetails = require("./../models/ShipmentDetails");

describe("ShipmentDetails Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save a new shipment detail to the database", async () => {
    const mockShipmentDetail = { insertId: 1 };
    db.pool.query.mockResolvedValue([mockShipmentDetail, undefined]);

    const shipmentDetailData = {
    
      ShipmentID: 1,
      ProductID: 1,
      Quantity: 10,
    };
    const shipmentDetail = new ShipmentDetails(shipmentDetailData);
    await shipmentDetail.save();

    // simulate setting the ShipmentDetailID after the successful save
    shipmentDetail.ShipmentDetailID = mockShipmentDetail.insertId;

    expect(db.pool.query).toHaveBeenCalled();
    expect(shipmentDetail.ShipmentDetailID).toEqual(
      mockShipmentDetail.insertId
    );
  });

  it("should update an existing shipment detail in the database", async () => {
    const mockShipmentDetail = { insertId: 1 };
    db.pool.query.mockResolvedValue([[], undefined]);

    const shipmentDetailData = {
      ShipmentID: 1,
      ProductID: 1,
      Quantity: 10,
    };
    const shipmentDetail = new ShipmentDetails(shipmentDetailData);
    await shipmentDetail.save();

    // simulate setting the ShipmentDetailID after the successful save
    shipmentDetail.ShipmentDetailID = mockShipmentDetail.insertId;

    expect(db.pool.query).toHaveBeenCalled();
    expect(shipmentDetail.ShipmentDetailID).toEqual(
      mockShipmentDetail.insertId
    );
  });

  it("should find all shipment detail of a particular shipmentID", async () => {
    const mockShipmentDetailData = {
      ShipmentDetailID: 1,
      ShipmentID: 1,
      ProductID: 1,
      Quantity: 10,
    };
    db.pool.query.mockResolvedValue([[mockShipmentDetailData], undefined]);

    const shipmentDetails = await ShipmentDetails.findByShipmentID(1);

    expect(db.pool.query).toHaveBeenCalledWith(expect.any(String), [1]);
    expect(shipmentDetails).toBeInstanceOf(Array);
    expect(shipmentDetails[0].Quantity).toEqual(10);
  });

  it("Should find shipmentDetails by their unique identifier of ShipmentID and ProductID", async () => {
    const mockShipmentDetailData = {
      ShipmentDetailID: 1,
      ShipmentID: 1,
      ProductID: 1,
      Quantity: 10,
    };
    db.pool.query.mockResolvedValue([[mockShipmentDetailData], undefined]);

    const shipmentDetail = await ShipmentDetails.findByID(1, 1);

    expect(db.pool.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);
    expect(shipmentDetail).toBeInstanceOf(ShipmentDetails);
    expect(shipmentDetail.Quantity).toEqual(10);
  });
});
