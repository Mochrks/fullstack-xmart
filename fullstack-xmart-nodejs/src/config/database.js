const pgp = require("pg-promise")();

const dbConfig = {
  user: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASSWORD,
  host: process.env.POSTGRE_HOST || "localhost",
  port: process.env.POSTGRE_PORT || 5432,
  database: process.env.POSTGRE_DATABASE,
};

const postgreDB = pgp(dbConfig);

postgreDB
  .connect()
  .then((obj) => {
    obj.done();
    console.log("Connection to PostgreSQL has been established successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL:", error.message);
  });

module.exports = postgreDB;
