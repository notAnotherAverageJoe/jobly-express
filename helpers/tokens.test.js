// Importing the jsonwebtoken library and the createToken function
const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");

const { SECRET_KEY } = require("../config");

// Describe block for grouping related tests for the createToken function
describe("createToken", function () {
  // Test case for verifying token creation for a non-admin user
  test("works: not admin", function () {
    // Create a token for a user with is_admin set to false
    const token = createToken({ username: "test", is_admin: false });
    // Verify the token using the SECRET_KEY
    const payload = jwt.verify(token, SECRET_KEY);
    // Check if the payload matches the expected structure and values
    expect(payload).toEqual({
      iat: expect.any(Number), // iat (issued at) should be a number (timestamp)
      username: "test",
      isAdmin: false, // isAdmin should be false for a non-admin user
    });
  });

  // Test case for verifying token creation for an admin user
  test("works: admin", function () {
    // Create a token for a user with isAdmin set to true
    const token = createToken({ username: "test", isAdmin: true });
    // Verify the token using the SECRET_KEY
    const payload = jwt.verify(token, SECRET_KEY);
    // Check if the payload matches the expected structure and values
    expect(payload).toEqual({
      iat: expect.any(Number), // iat (issued at) should be a number (timestamp)
      username: "test",
      isAdmin: true, // isAdmin should be true for an admin user
    });
  });

  // Test case for verifying token creation for a user without specifying admin status
  test("works: default no admin", function () {
    // Create a token for a user without specifying isAdmin
    const token = createToken({ username: "test" });
    // Verify the token using the SECRET_KEY
    const payload = jwt.verify(token, SECRET_KEY);
    // Check if the payload matches the expected structure and values
    expect(payload).toEqual({
      iat: expect.any(Number), // iat (issued at) should be a number (timestamp)
      username: "test",
      isAdmin: false, // isAdmin should default to false if not specified
    });
  });
});
