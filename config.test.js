"use strict";

describe("config can come from env", function () {
  test("works", function () {
    process.env.SECRET_KEY = "abc";
    process.env.PORT = "5000";
    process.env.NODE_ENV = "other"; // Set NODE_ENV to "other" or any non-test environment

    const config = require("./config");
    expect(config.SECRET_KEY).toEqual("abc");
    expect(config.PORT).toEqual(5000);
    expect(config.getDatabaseUri()).toEqual("postgresql:///jobly"); // Expect "postgresql:///jobly" for non-test environment
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12); // Verify BCRYPT_WORK_FACTOR remains 12

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.NODE_ENV;

    expect(config.getDatabaseUri()).toEqual("postgresql:///jobly"); // Ensure correct default URI
  });
});
