const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "samplepassword",
  host: "localhost",
  port: 5432,
  database: "snake2",
});

module.exports = pool;
