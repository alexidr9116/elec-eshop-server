const express = require("express");
const router = express.Router();
const HookController = require('../../controllers/HookController');

router.get(
    '/payment/qpay/:invoice',
    HookController.QPayHook
)
module.exports = router