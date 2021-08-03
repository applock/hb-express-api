require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs')
const moment = require('moment-timezone')

// Application level - converts json into javascript - unmarshalling
app.use(express.json());

// Enables cross-origin resource sharing - Remove at production env
app.use(cors());

// Morgan - Access Logging - items and pattern for Kibana dashboard - all incoming requests are logged
morgan.token('request-id', function (req, res) { return req.headers['request-id'] })
morgan.token('date', (req, res) => {
    // Without timezoned logging - logs will come like [Tue, 03 Aug 2021 14:13:12 GMT]
    // With this, logs come like [2021-08-03 19:52:09:131]
    return moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss:SSS');
})
app.use(morgan('[:date] [:remote-addr] [:request-id] [:method] [:url] [:status] [:http-version] [:response-time ms] ', { stream: fs.createWriteStream('./logs/access.log', { flags: 'a' }) }));

// Routers
const userRouter = require('./api/users/user.router')
const loginRouter = require('./api/login/login.router')

// ENDPOINTS - Routes to respective controllers
app.use('/hb/user', userRouter);
app.use('/hb/login', loginRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening at ${process.env.APP_PORT}..`)
});
