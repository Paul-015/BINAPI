// controllers/elementsControl.js

exports.getAll = (req, res) => {
    res.json({ message: "Tous les éléments récupérés" });
};

exports.create = (req, res) => {
    res.status(201).json({ message: "Élément créé" }); 
};

exports.getOne = (req, res) => {
    const id = req.params.id;
    res.json({ message: `Élément avec l'ID ${id} récupéré` }); 
};

exports.update = (req, res) => {
    const id = req.params.id;
    res.json({ message: `Élément avec l'ID ${id} mis à jour` }); 
};

exports.delete = (req, res) => {
    const id = req.params.id;
    res.status(204).send(); 
};
