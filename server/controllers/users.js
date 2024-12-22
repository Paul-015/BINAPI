const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const elementsController = require("../controllers/elementsControl");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/elements", authController.authenticate, elementsController.getAllElements);
router.get("/elements/:id", authController.authenticate, elementsController.getElementById);
router.post("/elements", authController.authenticate, elementsController.createElement);
router.put("/elements/:id", authController.authenticate, elementsController.updateElement);
router.delete("/elements/:id", authController.authenticate, elementsController.deleteElement);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database"); // Remplacez par votre config si différente

// Fonction pour créer un utilisateur
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérification si l'email existe déjà
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion du nouvel utilisateur dans la base de données
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  createUser,
};
