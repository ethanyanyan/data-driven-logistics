const mockInventoryDbRow = {
    InventoryLevelID: 1,
    LocationID: 1,
    ProductID: 1,
    Quantity: 10,
}

const mockInventoryDbRow2 = {
    InventoryLevelID: 2,
    LocationID: 2,
    ProductID: 2,
    Quantity: 30,
}

const mockInventoryDbAllRows = [mockInventoryDbRow, mockInventoryDbRow2]

const mockInventoryPostReq = {
    LocationID: 1,
    ProductID: 1,
    Quantity: 10,
}

const mockInventoryPostRes = {
    message: "Item logged successfully",
    data: mockInventoryDbRow,
}

const mockInventoryGetRes = {
    message: "Inventory id 1 retrieved successfully",
    data: mockInventoryDbRow
}

const mockInventoryPatchReq = {
    Quantity: 20,

}

const mockInventoryPatchRes = {
    message: "Inventory id 1 updated successfully",
    data: {
        InventoryLevelID: 1,
        LocationID: 1,
        ProductID: 1,
        Quantity: 30, // 20 + 10
    }
}

// In reality contains more field but only need affectedRows for this test
const adjustQuantityReturnModel = {
    affectedRows: 1,
}

const mockInventoryDeleteRes = {
    message: "InventoryLevel id 1 deleted successfully"
}

module.exports = {
    mockInventoryDbRow,
    mockInventoryPostReq,
    mockInventoryPostRes,
    mockInventoryGetRes,
    mockInventoryDbAllRows,
    mockInventoryDeleteRes,
    mockInventoryPatchReq,
    mockInventoryPatchRes,
    adjustQuantityReturnModel,
}