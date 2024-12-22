const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = async (req, res, next) => {
  try {
    const headerValue = req.headers.authorization;
    if (!headerValue || !headerValue.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token manquant ou invalide" });
    }

    const token = headerValue.split(" ")[1];
    console.log("Jeton reçu :", token); // Log du jeton pour vérifier sa valeur
    
    // Vérification du jeton avec la clé secrète
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token payload :", payload);  // Log du payload pour vérifier
    
    const user = await User.findByPk(payload.id);
    if (!user || !user.activated) {
      return res.status(401).json({ error: "Utilisateur introuvable ou désactivé" });
    }

    req.user = { id: user.id, username: user.username, role: user.role };
    next();
  } catch (error) {
    console.error("Erreur d'authentification :", error.message);
    res.status(403).json({ error: "Jeton invalide" });
  }
};
