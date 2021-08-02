const { createUser, getUserByEmail, getUserByMobile } = require('./user.controller');
const router = require('express').Router();

router.post('/', createUser);
//router.get('/:username', createUser);
router.get('/mobile/:mobile', getUserByMobile);
router.get('/email/:email', getUserByEmail);

module.exports = router;