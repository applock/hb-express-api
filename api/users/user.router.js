const { createUser } = require('./user.controller');
const router = require('express').Router();

router.post('/user', createUser);

module.exports = router;