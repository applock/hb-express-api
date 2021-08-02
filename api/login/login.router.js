const { loginByEmail, loginByMobile, loginByUsername } = require('./login.controller');
const router = require('express').Router();
//const { validateObjectMW } = require('../validation/validateResource');
//const { emailLoginSchema, mobileLoginSchema, usernameLoginSchema } = require('../validation/validator');

//router.post('/mobile/', validateObjectMW(mobileLoginSchema), loginByMobile);
//router.post('/email/', validateObjectMW(emailLoginSchema), loginByEmail);
//router.post('/username/', validateObjectMW(usernameLoginSchema), loginByUsername);

router.post('/mobile/', loginByMobile);
router.post('/email/', loginByEmail);
router.post('/username/', loginByUsername);

module.exports = router;