const UsersModel = require('../models/user');
// return all users/ return a single user
module.exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        // const password = req.query.password;

        UsersModel.findById(id)
            .then((user) => {

                if (!user) {
                    res.status(404).send({
                        message: `Not found user with id: ${id}.`
                    });
                }

                res.send(user);
            })
            .catch((err) => {
                res.status(500).send({
                    message: `Error retrieving user by id: ${id}.`
                });
            });
    }

    UsersModel.find()
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.status(500);
        });
};
