const config = require("./config");

describe("config can come from env", () => {
  let originalEnv;

  beforeAll(() => {
    // Store original environment variables
    originalEnv = process.env;
  });

  afterEach(() => {
    // Restore original environment variables after each test
    process.env = originalEnv;
  });

  test("works with default values", () => {
    // Temporarily clear environment variables
    process.env = {};

    // Re-require config to apply the changes
    const defaultConfig = require("./config");

    expect(defaultConfig.SECRET_KEY).toEqual("secret-dev");
    expect(defaultConfig.PORT).toEqual(3001);
    expect(defaultConfig.getDatabaseUri()).toEqual(
      "postgresql://localhost:@localhost:5432/jobly"
    ); // Adjusted expected value
    expect(defaultConfig.BCRYPT_WORK_FACTOR).toEqual(12);
  });

  test("works with environment values", () => {
    // Set environment variables for this test
    process.env.DB_USER = "users1";
    process.env.DB_PASSWORD = "pwpw1";

    // Re-require config to apply the changes
    const configWithEnv = require("./config");

    expect(configWithEnv.SECRET_KEY).toEqual("secret-dev");
    expect(configWithEnv.PORT).toEqual(3001);
    expect(configWithEnv.getDatabaseUri()).toEqual(
      "postgresql://users1:pwpw1@localhost:5432/jobly"
    ); // Check environment URI
    expect(configWithEnv.BCRYPT_WORK_FACTOR).toEqual(12);
  });
});
