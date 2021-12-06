const axios = require('axios');

// render templates
module.exports.homeRoute = (req, res) => {
    // get req to /api/users
    axios.get('http://localhost:3000/users')
        .then((response) => {
            return res.render("index", {
                users: response.data
            });
        })
        .catch((err) => {
            res.send(err);
        });
};