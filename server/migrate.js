const connection = require("./models/db");
require("./models/users");
require("./models/elements");

connection
  .sync({
    alter: true,
  })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());