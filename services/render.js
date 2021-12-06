const axios = require('axios');

// render templates
module.exports.dash = (req, res) => {
    // get req to /api/users
    axios.get('http://localhost:3000/users')
        .then((response) => {
            return res.render("dashboard", {
                user: response.data
            });
        })
        .catch((err) => {
            res.send(err);
        });
};