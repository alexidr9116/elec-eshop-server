const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/CategoryController');
const UserController = require('../../controllers/UserController');

router.get('/last-currency-rate',CategoryController.getLastCurrencyRates);
router.get('/pair-data',UserController.getPairs)

module.exports = router;