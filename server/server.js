const express = require("express");
const dotenv = require("dotenv");

// Import des middlewares
const parseBody = require("./middlewares/parseBody");
const checkAuth = require("./middlewares/checkAuth");
const errorHandler = require("./middlewares/errorHandler");

// Import des routes
const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/user");
const animalRouter = require("./routes/animal");
const securityRouter = require("./routes/security");

// Charger les variables d'environnement depuis .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Définit un port par défaut si non spécifié dans .env

// Middleware pour analyser les données JSON
app.use(express.json()); 

// Middlewares personnalisés
app.use(parseBody);  // Middleware de parsing du corps de la requête
app.use(checkAuth);  // Middleware d'authentification

// Routes
app.get("/", (req, res) => {
  res.send("Hello world !!");
});

app.use("/api/auth", authRoutes); // Route d'authentification
app.use(userRouter); // Route utilisateur
app.use(animalRouter); // Route animal
app.use(securityRouter); // Route sécurité

// Middleware pour les routes non trouvées (404)
app.use((req, res, next) => {
  const error = new Error("Route introuvable");
  error.statusCode = 404;
  next(error);
});

// Middleware global de gestion des erreurs
app.use(errorHandler);

// Gestion des erreurs non capturées (exceptions)
process.on("uncaughtException", (err) => {
  console.error("Erreur non capturée :", err.message);
  console.error(err.stack);
  process.exit(1); // Quitter le processus proprement
});

// Gestion des promesses rejetées non gérées
process.on("unhandledRejection", (reason, promise) => {
  console.error("Promesse non gérée rejetée :", reason);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
