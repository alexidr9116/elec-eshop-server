const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');
const UserController = require('../../controllers/UserController');
const validator = require('../../utils/Validation');
const auth = require('../../middleware/AuthMiddleware');
const { imageUpload } = require('../../utils/FileUploader');

router.get('/get-billing-address',auth,UserController.getBillingAddress);
router.delete('/delete-billing-address/:id',auth,UserController.deleteBillingAddress);
router.put(
    '/put-billing-address',
    auth,
    [
        validator.reqStringValidator('type'),
        validator.reqStringValidator('fullName'),
        validator.reqStringValidator('address'),
        validator.reqStringValidator('country'),
        validator.reqStringValidator('isDefault'),
    ],
    UserController.putBillingAddress
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
router.post(
    "/set-profile-with-image",
    auth,
    [
        imageUpload.single("image"),
        validator.reqStringValidator('firstname'),
        validator.reqStringValidator('lastname'),
        validator.reqStringValidator('bday'),
    ],
    UserController.setProfile
)
router.post(
    "/set-profile-without-image",
    auth,
    [
        validator.reqStringValidator('firstname'),
        validator.reqStringValidator('lastname'),
        validator.reqStringValidator('bday'),
    ],
    UserController.setProfile
)
router.post(
    "/feedback",
    [
        validator.reqStringValidator('phone'),
        validator.reqStringValidator('name'),
        validator.reqStringValidator('feedback'),
        validator.reqStringValidator('email'),
    ],
    UserController.setFeedback
)
router.post(
    "/site-feedback",
    auth,
    [
        validator.reqStringValidator('rating'),
        validator.reqStringValidator('feedback'),
    ],
    UserController.setSiteFeedback
)
router.get('/site-feedback',UserController.getSiteFeedback);
router.post('/send-verify-mail',auth,AuthController.sendAuthMail)
module.exports = router;