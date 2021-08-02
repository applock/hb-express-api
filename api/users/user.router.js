const { createUser, getUserByEmail, getUserByMobile } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../validation/tokenValidator')

router.post('/', checkToken, createUser);
//router.get('/:username', createUser);
router.get('/mobile/:mobile', checkToken, getUserByMobile);
router.get('/email/:email', checkToken, getUserByEmail);

module.exports = router;