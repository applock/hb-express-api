const pool = require("../../config/db");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users (username, password, email, mobile, enabled) values (?,?,?,?,?)`,
            [data.username, data.password, data.email, data.mobile, data.enabled],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getUserByUsername: (username, callBack) => {
        pool.query(
            `select * from users where username = ?`,
            [username],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getUserByMobile: (mobile, callBack) => {
        pool.query(
            `select * from users where mobile = ?`,
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
