const { create, getUserByMobile, getUserByEmail } = require('./user.service')
const { genSaltSync, hashSync } = require('bcrypt')
const _ = require('lodash')
const { sendMail } = require('../mailer/emailer')

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

                let msg = 'DB error';
                let errCode = 500;
                if (err.code == 'ER_DUP_ENTRY') {
                    let field = err.message.split('.');
                    field = field[field.length - 1];
                    field = field.substr(0, field.length - 1);
                    msg = `${field} ${body[field]} already in use`
                    errCode = 400;
                }
                return res.status(errCode).json({
                    success: 0,
                    message: msg
                })
            }

            // send email
            if (process.env.SEND_ONBOARDING_EMAIL) {
                let mailBody = {
                    from: process.env.MAILER_USER,
                    to: body.email,
                    subject: `${process.env.APP_NAME} | Welcome Onboard`,
                    html: `<h2>${process.env.APP_NAME} welcomes you!<br><br>Your user id - ${body.username}`
                }
                sendMail(mailBody);
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