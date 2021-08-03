const mailer = require('nodemailer')

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
})

let body = {

}

module.exports = {
    sendMail: (body) => {
        transporter.sendMail(body, (err, result) => {
            if (err) {
                console.log(err)
                return false;
            } else {
                console.log(result);
            }
        })
    }
}