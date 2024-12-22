const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
console.log("JWT_SECRET chargé :", process.env.JWT_SECRET);


const parseBody = require("./middlewares/parseBody");
const checkAuth = require("./middlewares/checkAuth");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/user");
const elementsRouter = require("./routes/elements"); // Changez cela pour correspondre au nom de votre route
const securityRouter = require("./routes/security");




const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json()); 

app.use(parseBody);  
app.use(checkAuth);  

app.get("/", (req, res) => {
  res.send("Hello world !!");
});

app.use("/api/auth", authRoutes);
app.use("/users", userRouter);
app.use("/api/elements", elementsRouter); 
app.use("/api/security", securityRouter); 


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
