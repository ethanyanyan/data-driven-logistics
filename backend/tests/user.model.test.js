// tests/user.model.test.js
const User = require("../models/User");
const bcrypt = require("bcrypt");

describe("User Model", () => {
  it("should hash the password correctly", async () => {
    const password = "Password123";
    const hashedPassword = await User.hashPassword(password);
    const result = await bcrypt.compare(password, hashedPassword);
    expect(result).toBe(true);
  });
});
