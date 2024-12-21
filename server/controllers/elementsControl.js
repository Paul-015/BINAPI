// Importer la base de données ou tout autre module nécessaire
const db = require("../config/db");

// Contrôleur pour récupérer tous les éléments
exports.getAllElements = (req, res) => {
    const query = "SELECT * FROM elements";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la récupération des éléments." });
        }
        res.status(200).json(results);
    });
};

// Contrôleur pour récupérer un élément spécifique par son ID
exports.getElementById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM elements WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la récupération de l'élément." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Élément non trouvé." });
        }
        res.status(200).json(results[0]);
    });
};

// Contrôleur pour créer un nouvel élément
exports.createElement = (req, res) => {
    const { name, symbol, atomicNumber } = req.body;
    const query = "INSERT INTO elements (name, symbol, atomicNumber) VALUES (?, ?, ?)";
    db.query(query, [name, symbol, atomicNumber], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la création de l'élément." });
        }
        res.status(201).json({ message: "Élément créé avec succès.", id: result.insertId });
    });
};

// Contrôleur pour mettre à jour un élément
exports.updateElement = (req, res) => {
    const { id } = req.params;
    const { name, symbol, atomicNumber } = req.body;
    const query = "UPDATE elements SET name = ?, symbol = ?, atomicNumber = ? WHERE id = ?";
    db.query(query, [name, symbol, atomicNumber, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la mise à jour de l'élément." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Élément non trouvé." });
        }
        res.status(200).json({ message: "Élément mis à jour avec succès." });
    });
};

// Contrôleur pour supprimer un élément
exports.deleteElement = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM elements WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la suppression de l'élément." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Élément non trouvé." });
        }
        res.status(200).json({ message: "Élément supprimé avec succès." });
    });
};
