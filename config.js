"use strict";

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  const dbUser = process.env.DB_USER || "";
  const dbPassword = process.env.DB_PASSWORD || "";
  const dbHost = process.env.DB_HOST || "localhost";
  const dbPort = process.env.DB_PORT || 5432;
  const dbName = process.env.DB_DATABASE || "jobly";

  if (process.env.NODE_ENV === "test") {
    return `postgresql:///jobly_test`;
  }

  return `postgresql://${
    dbUser ? `${dbUser}:${dbPassword}@` : ""
  }${dbHost}:${dbPort}/${dbName}`;
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
