const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connection = require('../config/db');

// Inscription
exports.register = (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const query = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
  connection.query(query, [email, hashedPassword, name], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de l\'inscription', error: err });
    }
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  });
};

// Connexion
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Utilisateur ou mot de passe incorrect' });
    }
    
    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Utilisateur ou mot de passe incorrect' });
    }
    
    // Générer un JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  });
};
