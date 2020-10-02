const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Fc8b47368cadc7e1",
  host: "localhost",
  port: 5432,
  database: "snake2",
});

module.exports = pool;
