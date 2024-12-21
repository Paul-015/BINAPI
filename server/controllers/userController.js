
const users = []; 
exports.getAll = (req, res) => {
    res.json(users); 
};

exports.create = (req, res) => {
    const newUser = req.body; 
    users.push(newUser); 
    res.status(201).json(newUser); 
};

exports.getOne = (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId); 
    if (user) {
        res.json(user); 
    } else {
        res.status(404).send('Utilisateur non trouvé');
    }
};

exports.update = (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body }; 
        res.json(users[userIndex]);
    } else {
        res.status(404).send('Utilisateur non trouvé');
    }
};

exports.delete = (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1); 
        res.status(204).send(); 
    } else {
        res.status(404).send('Utilisateur non trouvé');
    }
};
