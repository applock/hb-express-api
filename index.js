require('dotenv').config();
const express = require('express');
const app = express();

// Application level - converts json into javascript - unmarshalling
app.use(express.json());

const userRouter = require('./api/users/user.router')
const loginRouter = require('./api/login/login.router')

// ENDPOINT
app.use('/hb/user', userRouter);
app.use('/hb/login', loginRouter);

/*app.get("/hb/login", (req, resp) => {
    resp.json({
        "message": "Running"
    })
});*/

app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening at ${process.env.APP_PORT}..`)
});
