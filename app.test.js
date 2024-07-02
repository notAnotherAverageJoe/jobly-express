const request = require("supertest");
const app = require("./app"); // Adjust the path as necessary
const db = require("./db");

// Test for 404 on a non-existing path
test("not found for site 404", async () => {
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
});

// Test for 404 on a non-existing path with modified NODE_ENV
test("not found for site 404 (test stack print)", async () => {
  process.env.NODE_ENV = ""; // Set NODE_ENV to empty string for this test
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
  delete process.env.NODE_ENV; // Clean up after the test
});

// Close database connection after all tests
afterAll(() => {
  db.end();
});
