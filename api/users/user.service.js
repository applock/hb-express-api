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
};
