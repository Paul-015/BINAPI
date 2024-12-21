const { Sequelize } = require("sequelize");

const defaultURL = "mysql://username:password@db-1/dbname";

const connection = new Sequelize(process.env.DATABASE_URL ?? defaultURL);

connection
  .authenticate()
  .then(() => console.log("Database is ready"))
  .catch((err) => console.error("Failed to connect to the database:", err));

module.exports = connection;
