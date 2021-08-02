const pool = require("../../config/db");

module.exports = {
    loginUserByUsername: (username, callBack) => {
        pool.query(
            `select * from users where username = ? and enabled=1`,
            [username],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    loginUserByEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ? and enabled=1`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    loginUserByMobile: (mobile, callBack) => {
        pool.query(
            `select * from users where mobile = ? and enabled=1`,
            [mobile],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
};
