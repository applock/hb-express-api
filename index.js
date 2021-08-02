require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router')

app.get("/hb/login", (req, resp) => {
    resp.json({
        "message": "Running"
    })
});


app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening at ${process.env.APP_PORT}..`)
});
