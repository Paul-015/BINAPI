const express = require("express");
const dotenv = require("dotenv");

<<<<<<< HEAD
=======
// Import des middlewares
const parseBody = require("./middlewares/parseBody");
const checkAuth = require("./middlewares/checkAuth");
const errorHandler = require("./middlewares/errorHandler");

// Import des routes
>>>>>>> f04aadca12870ffbf970388d8f9753d56b206da3
const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/user");
const elementsRouter = require("./routes/elements"); // Changez cela pour correspondre au nom de votre route
const securityRouter = require("./routes/security");

<<<<<<< HEAD
=======
// Charger les variables d'environnement depuis .env
>>>>>>> f04aadca12870ffbf970388d8f9753d56b206da3
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

<<<<<<< HEAD
app.use(express.json()); 
=======
// Middleware pour analyser les données JSON
app.use(express.json()); 

// Middlewares personnalisés
app.use(parseBody);  // Middleware de parsing du corps de la requête
app.use(checkAuth);  // Middleware d'authentification
>>>>>>> f04aadca12870ffbf970388d8f9753d56b206da3

app.get("/", (req, res) => {
  res.send("Hello world !!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter); 
app.use("/api/elements", elementsRouter); 
app.use("/api/security", securityRouter); 

<<<<<<< HEAD
=======
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
>>>>>>> f04aadca12870ffbf970388d8f9753d56b206da3
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
