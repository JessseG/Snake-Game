const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, // heroku addon
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

//_______________________________________________________________

// const devConfig = `postgresql://${process.env.PG_USER}:
//                                 ${process.env.PG_PASSWORD}@
//                                 ${process.env.PG_HOST}:
//                                 ${process.env.PG_PORT}/
//                                 ${process.env.PG_DATABASE}`;

// const proConfig = process.env.DATABASE_URL; // heroku addon

// const pool = new Pool({
//   connectionString:
//     process.env.NODE_ENV === "production" ? proConfig : devConfig,
// });

//_______________________________________________________________

// const pool = new Pool({
//   user: "postgres",
//   password: "Fc8b47368cadc7e1",
//   host: "localhost",
//   database: "snake2",
//   port: 5432,
// });

//________________________________________________________________

module.exports = pool;
