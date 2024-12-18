const express = require("express");
const userRouteur  = require("./routes/user"); // routes déclarés mais pas de fonction donc 'cannot get'

require('dotenv').config();

const app = express();

app.get("/", (request, response, next) => {
    response.send("Hello world !!");
  });
  
app.use(userRouteur);

app.listen(process.env.PORT, () =>
    console.log("Server listening on port " + process.env.PORT)
  );