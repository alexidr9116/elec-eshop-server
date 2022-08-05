const express = require('express');
const router = express.Router();
const auth = require('../../middleware/AuthMiddleware');
const ProductController = require('../../controllers/ProductController');

router.get('/get-detail/:id',ProductController.getProductDetail);
router.get('/get-all',ProductController.getAllProducts);
router.get('/get-hot',ProductController.getHotProducts);
router.post('/gets-by-ids',ProductController.getProductsByIds);
router.post('/get-orders',auth,ProductController.getDeliveryOrders);
router.get('/get-banners',ProductController.getBannerImages);
module.exports = router;