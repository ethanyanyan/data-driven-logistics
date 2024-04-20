const mockProductDbRow = {
  ProductID: 1,
  Name: "Product 1",
  Description: "Description 1",
  UnitPrice: 10,
};

const mockProductDbRow2 = {
  ProductID: 2,
  Name: "Product 2",
  Description: "Description 2",
  UnitPrice: 20,
};

const mockProductDbAllRows = [mockProductDbRow, mockProductDbRow2];

const mockProductPostReq = {
  Name: "Product 1",
  Description: "Description 1",
  UnitPrice: 10,
};

const mockProductPostRes = {
  message: "Product created successfully",
  data: mockProductDbRow,
};

const mockProductGetRes = {
  message: "Product id 1 retrieved successfully",
  data: mockProductDbRow,
};

const mockProductPatchReq = {
  UnitPrice: 24,
};

const mockProductUpdateData = {
  ProductID: 1,
  Name: "Product 1",
  Description: "Description 1",
  UnitPrice: 24,
}

const mockProductPatchRes = {
  message: "Product id 1 updated successfully",
  data: mockProductUpdateData,
};


const mockProductPathResFail = {
  error:
    "Product with id 1 failed to update or no changes were made. Make sure the fields are different from the current values.",
};

const mockProductDeleteRes = {
  message: "Product id 1 deleted successfully",
};

module.exports = {
    mockProductDbRow,
    mockProductPostReq,
    mockProductPostRes,
    mockProductGetRes,
    mockProductPatchReq,
    mockProductPatchRes,
    mockProductPathResFail,
    mockProductDbAllRows,
    mockProductDeleteRes
    };
