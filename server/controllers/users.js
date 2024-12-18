const users = [];

module.exports = {
    getAll: (req, res, next) => {
        res.json(users);
    },
    create: (req, res, next) => {

    },
    getOne: (req, res, next) => {
        const user = users.find((user) => user.id === req.params.id);
        if(user) {
            res.json(user);
        }else{
            res.sendStatus(404);
        }
    },
    update: (req, res, next) => {

    },
    delete: (req, res, next) => {

    },
};