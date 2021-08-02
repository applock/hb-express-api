const { sign } = require('jsonwebtoken')
const { loginUserByMobile, loginUserByEmail, loginUserByUsername } = require('./login.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')

module.exports = {
    loginByUsername: (req, res) => {
        const body = req.body;

        // Calling service
        loginUserByUsername(body.username, (err, results) => {
            if (err) {
                console.error(err)
                res.status(400).json({
                    success: 0,
                    message: 'Invalid username or password'
                })
            }

            const passwordMatched = compareSync(body.password, results[0].password);
            if (passwordMatched) {
                results.password = undefined;
                const jwt = sign({ result: results }, process.env.JWT_KEY, { expiresIn: '2h' });
                return res.status(200).json({
                    success: 1,
                    message: 'Login successful',
                    token: jwt
                })
            } else {
                res.status(400).json({
                    success: 0,
                    message: 'Invalid username or password'
                })
            }
        });
    },
    loginByEmail: (req, res) => {
        const body = req.body;

        // Calling service
        loginUserByEmail(body.email, (err, results) => {
            if (err) {
                console.error(err)
                res.status(400).json({
                    success: 0,
                    message: 'Invalid email or password'
                })
            }
            const passwordMatched = compareSync(body.password, results[0].password);
            if (passwordMatched) {
                results.password = undefined;
                const jwt = sign({ result: results }, process.env.JWT_KEY, { expiresIn: '2h' });
                return res.status(200).json({
                    success: 1,
                    message: 'Login successful',
                    token: jwt
                })
            } else {
                res.status(400).json({
                    success: 0,
                    message: 'Invalid email or password'
                })
            }
        });
    },
    loginByMobile: (req, res) => {
        const body = req.body;

        // Calling service
        loginUserByMobile(body.mobile, (err, results) => {
            if (err) {
                console.error(err)
                res.status(400).json({
                    success: 0,
                    message: 'Invalid mobile or password'
                })
            }
            console.log('Comparing passwords..')
            const passwordMatched = compareSync(body.password, results[0].password);
            if (passwordMatched) {
                results.password = undefined;
                const jwt = sign({ result: results }, process.env.JWT_KEY, { expiresIn: '2h' });
                return res.status(200).json({
                    success: 1,
                    message: 'Login successful',
                    token: jwt
                })
            } else {
                res.status(400).json({
                    success: 0,
                    message: 'Invalid mobile or password'
                })
            }
        });
    }
}