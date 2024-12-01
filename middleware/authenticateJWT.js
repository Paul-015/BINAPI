const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user; // il va  stocker les informations de l'utilisateur dans req.user
        next();
    });
};

module.exports = authenticateJWT;
