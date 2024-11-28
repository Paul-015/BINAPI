require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env

const express = require('express'); // Importation du module Express

const app = express(); // Crée une application Express

const port = process.env.PORT || 3000; // Utilise la variable d'environnement PORT ou 3000 par défaut

// Route de base
app.get('/', (req, res) => {
  res.send('Hello, world!'); // Envoie une réponse simple
});

// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Server est en écoute sur le port ${port}`); // Affiche un message dans la console
});
