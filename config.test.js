"use strict";

describe("config can come from env", function () {
  beforeEach(() => {
    jest.resetModules(); // Clear the module cache before each test
  });

  afterEach(() => {
    // Clear all environment variables to ensure no state leaks between tests
    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.DATABASE_URL;
    delete process.env.DB_USER;
    delete process.env.DB_PASSWORD;
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;
    delete process.env.DB_DATABASE;
    delete process.env.NODE_ENV;
  });

  test("works with environment variables", function () {
    // Set environment variables to specific test values
    process.env.SECRET_KEY = "abc";
    process.env.PORT = "5000";
    process.env.DB_USER = "test_user";
    process.env.DB_PASSWORD = "test_pass";
    process.env.DB_HOST = "test_host";
    process.env.DB_PORT = "5001";
    process.env.DB_DATABASE = "test_db";
    process.env.NODE_ENV = "other";

    // Import the config module after setting the environment variables
    const config = require("./config");

    // Verify that the configuration values match the environment variables
    expect(config.SECRET_KEY).toEqual("abc");
    expect(config.PORT).toEqual(5000);
    expect(config.getDatabaseUri()).toEqual(
      "postgresql://test_user:test_pass@test_host:5001/test_db"
    );
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);
  });

  test("works with default values", function () {
    // Delete specific environment variables to ensure defaults are used
    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.DATABASE_URL;
    delete process.env.DB_USER;
    delete process.env.DB_PASSWORD;
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;
    delete process.env.DB_DATABASE;
    process.env.NODE_ENV = "development"; // Set to development for default case

    // Import the config module after clearing the environment variables
    const config = require("./config");

    // Verify that the configuration values match the default values
    expect(config.SECRET_KEY).toEqual("secret-dev");
    expect(config.PORT).toEqual(3001);
    expect(config.getDatabaseUri()).toEqual(
      "postgresql://localhost:5432/jobly"
    ); // Check default URI
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);
  });

  test("works in test environment", function () {
    // Set NODE_ENV to "test" to test the test environment
    process.env.NODE_ENV = "test";

    // Import the config module after setting the test environment
    const config = require("./config");

    // Verify that the configuration values match the test environment values
    expect(config.getDatabaseUri()).toEqual("postgresql:///jobly_test");
    expect(config.BCRYPT_WORK_FACTOR).toEqual(1);
  });
});
