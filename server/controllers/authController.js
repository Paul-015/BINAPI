const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

// Inscription d'un utilisateur
exports.register = (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de l'inscription." });
        }
        res.status(201).json({ message: "Utilisateur inscrit avec succès." });
    });
};

// Connexion d'un utilisateur
exports.login = (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect." });
        }
        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect." });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Connexion réussie.", token });
    });
};

// Middleware pour vérifier le token
exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ error: "Token manquant." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token invalide." });
        }
        req.user = decoded;
        next();
    });
};
