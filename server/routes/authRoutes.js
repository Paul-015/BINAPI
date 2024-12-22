const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/users"); // Votre modèle d'utilisateur

const router = express.Router();

// Route de connexion
router.post("/login", async (req, res) => {
  try {
    // Récupérer les informations envoyées dans la requête
    const { username, password } = req.body;

    // Trouver l'utilisateur dans la base de données par son nom d'utilisateur
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    // Vérifier si le mot de passe est correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    // Créer un payload (les informations que vous voulez stocker dans le jeton)
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    // Générer un jeton JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Répondre avec le jeton JWT
    res.json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Une erreur est survenue" });
  }
});

module.exports = router;
