const express = require("express");
const userRouter = require("./routes/user");
const parseBody = require("./middlewares/parseBody");
const checkAuth = require("./middlewares/checkAuth");
const errorHandler = require("./middlewares/errorHandler");

const app = express();


app.use(express.json());


app.use(parseBody);
app.use(checkAuth);


app.get("/", (req, res) => {
  res.send("Hello world !!");
});

app.use(userRouter);
app.use(require("./routes/animal"));
app.use(require("./routes/security"));

app.use((req, res, next) => {
  const error = new Error("Route introuvable");
  error.statusCode = 404;
  next(error);
});


app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
 