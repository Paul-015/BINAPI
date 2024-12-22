const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
console.log("JWT_SECRET chargé :", process.env.JWT_SECRET); // tester 

const parseBody = require("./middlewares/parseBody");
const checkAuth = require("./middlewares/checkAuth");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/user");
<<<<<<< HEAD
const elementsRouter = require("./routes/elements");
=======
const elementsRouter = require("./routes/elements"); 
>>>>>>> 186c6040f9c49636c83cdab29db3f0cb1f227eb7
const securityRouter = require("./routes/security");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

app.use(parseBody);  

app.use("/api/auth", authRoutes); 

app.use(checkAuth); 

app.use("/users", userRouter);
app.use("/api/elements", elementsRouter); 
app.use("/api/security", securityRouter);

app.get("/", (req, res) => {
  res.send("Hello world !!");
});

app.use((req, res, next) => {
  res.status(404).send({ error: `Route ${req.method} ${req.url} not found.` });
});

app.use(errorHandler);

process.on("uncaughtException", (err) => {
  console.error("Erreur non capturée :", err.message);
  console.error(err.stack);
  process.exit(1); 
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Promesse non gérée rejetée :", reason);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
