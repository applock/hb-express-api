const { create, getUserByMobile, getUserByEmail } = require('./user.service')
const { genSaltSync, hashSync } = require('bcrypt')
const _ = require('lodash')

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
                data: results
            })
        });
    },
    getUserByEmail: (req, res) => {
        const email = req.params.email;

        if (_.isEmpty(email)) {
            return res.status(400).json({
                success: 0,
                message: 'Email cannot be empty'
            })
        }

        // Calling service
        getUserByEmail(email, (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({
                    success: 0,
                    message: 'DB error'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
    getUserByMobile: (req, res) => {
        const mobile = req.params.mobile;

        if (_.isEmpty(mobile)) {
            return res.status(400).json({
                success: 0,
                message: 'Mobile cannot be empty'
            })
        }

        // Calling service
        getUserByMobile(mobile, (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({
                    success: 0,
                    message: 'DB error'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    }
}