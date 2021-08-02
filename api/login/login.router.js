const { loginByEmail, loginByMobile, loginByUsername } = require('./login.controller');
const router = require('express').Router();
const { validateResource } = require('../validation/validateResource');
const { emailLoginSchema, mobileLoginSchema, usernameLoginSchema } = require('../validation/validator');

router.post('/mobile/', validateResource(mobileLoginSchema), loginByMobile);
router.post('/email/', validateResource(emailLoginSchema), loginByEmail);
router.post('/username/', validateResource(usernameLoginSchema), loginByUsername);

//router.post('/mobile/', loginByMobile);
//router.post('/email/', loginByEmail);
//router.post('/username/', loginByUsername);

module.exports = router;