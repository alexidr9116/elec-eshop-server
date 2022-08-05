const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');
const validator = require('../../utils/Validation');
const auth = require('../../middleware/AuthMiddleware');

router.post(
    '/register',
    [
        validator.reqStringValidator('firstName'),
        validator.reqStringValidator('lastName'),
        validator.reqStringValidator('email'),
        validator.reqStringValidator('phone'),
        validator.reqStringValidator('password'),
    ],
    AuthController.register
)
router.get(
    '/verify/email/:token',
    AuthController.emailVerify
)
router.post(
    '/login',
    [
        validator.reqStringValidator('email'),
        validator.reqStringValidator('password'),
    ],
    AuthController.login
)
router.get(
    '/my-account',
    auth,
    AuthController.account
)
router.post('/send-verify-mail',auth,AuthController.sendAuthMail)
module.exports = router;