const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/user");
const elementsRouter = require("./routes/elements"); // Changez cela pour correspondre au nom de votre route
const securityRouter = require("./routes/security");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Hello world !!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter); 
app.use("/api/elements", elementsRouter); 
app.use("/api/security", securityRouter); 

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
