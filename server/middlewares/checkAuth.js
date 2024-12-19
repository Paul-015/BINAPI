const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
    const headerValue = req.headers.authorization ?? req.headers.Authorization;
    if (!headerValue) {
        return res.status(401).json({ message: "Token manquant" });
    }

    const [type, token] = headerValue.split(/\s+/);
    if (type !== "Bearer") {
        return res.status(401).json({ message: "Format de token invalide. Utilisez 'Bearer <token>'" });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET non configuré dans le fichier .env");
        }
        const payload = jwt.verify(token, secret);

        const user = await User.findByPk(payload.id);
        if (!user) {
            return res.status(401).json({ message: "Utilisateur introuvable" });
        }

        if (!user.activated) {
            return res.status(403).json({ message: "Compte utilisateur désactivé" });
        }

        req.user = { id: user.id, username: user.username, role: user.role };


        next();
    } catch (error) {
        console.error("Erreur d'authentification JWT :", error.message);
        return res.status(401).json({ message: "Token invalide ou expiré" });
    }
};