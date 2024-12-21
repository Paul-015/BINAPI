const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = async (req, res, next) => {
  const headerValue = req.headers.authorization ?? req.headers.Authorization;
  if (!headerValue) {
    const error = new Error("Token manquant");
    error.statusCode = 401;
    return next(error);
  }

  const [type, token] = headerValue.split(/\s+/);
  if (type !== "Bearer") {
    const error = new Error("Format de token invalide. Utilisez 'Bearer <token>'");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET non configuré dans le fichier .env");
    }

    const payload = jwt.verify(token, secret);

    const user = await User.findByPk(payload.id);
    if (!user) {
      const error = new Error("Utilisateur introuvable");
      error.statusCode = 401;
      return next(error);
    }

    if (!user.activated) {
      const error = new Error("Compte utilisateur désactivé");
      error.statusCode = 403;
      return next(error);
    }

    req.user = { id: user.id, username: user.username, role: user.role };
    next();
  } catch (error) {
    console.error("Erreur d'authentification JWT :", error.message);
    error.statusCode = 401; 
    next(error);
  }
};
