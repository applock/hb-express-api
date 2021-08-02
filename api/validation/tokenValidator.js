const { verify } = require('jsonwebtoken')
const _ = require('lodash')

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            if (token.length > 6 && _.startsWith(token.substr(0, 6).toLowerCase(), 'bearer')) {
                token = token.slice(7);
            }
            verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        success: 0,
                        message: 'Invalid token'
                    })
                } else {
                    console.log('Decoded JWT - ' + JSON.stringify(decoded))
                    next();
                }
            })
        } else {
            res.status(401).json({
                success: 0,
                message: 'Authorization token missing'
            })
        }
    }
}