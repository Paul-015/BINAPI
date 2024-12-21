const express = require("express");
const dotenv = require("dotenv");

// Import des routes
const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/user");
const animalRouter = require("./routes/animal");
const securityRouter = require("./routes/security");

// Configuration de l'application
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; // Définit un port par défaut si non spécifié dans .env

app.use(express.json()); // Middleware pour analyser les données JSON

// Routes
app.get("/", (req, res) => {
  res.send("Hello world !!");
});

app.use("/api/auth", authRoutes); // Route d'authentification
app.use(userRouter); // Route utilisateur
app.use(animalRouter); // Route animal
app.use(securityRouter); // Route sécurité

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
