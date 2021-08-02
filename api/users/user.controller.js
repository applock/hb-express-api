const { create } = require('./user.service')
const { genSaltSync, hashSync } = require('bcrypt')

module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        // Hashing the password
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        // Calling service
        create(body, (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({
                    success: 0,
                    message: 'DB error'
                })
            }
            return res.status(201).json({
                success: 1,
                message: 'User added',
                data1: results
            })
        });
    }
}