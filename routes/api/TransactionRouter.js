const express = require('express');
const router = express.Router();
const TransactionController = require('../../controllers/TransactionController');
const QPayController = require('../../controllers/QPayController');
const auth = require('../../middleware/AuthMiddleware');
const validator = require('../../utils/Validation');

router.post('/qpay',auth,QPayController.pay);
router.get('/get/:id',auth,QPayController.getStatus);
router.get('/user',auth,TransactionController.getUserTransactions);
router.put('/put', auth,
    [
        validator.reqStringValidator('transactionId'),
        validator.reqStringValidator('billingAddress'),
        validator.reqStringValidator('deliveryType'),
        validator.reqStringValidator('mode'),
        validator.reqStringValidator('result'),
        validator.reqNumberValidator('total'),
        validator.reqStringValidator('currency'),

    ],
    TransactionController.putTransaction);

module.exports = router;