const express = require('express');
const router = express.Router();
const ReviewController = require('../../controllers/ReviewController');
const auth = require('../../middleware/AuthMiddleware');

router.get('/get-reviews/:productId',ReviewController.getReviewsByProductId);
router.put('/product',auth,ReviewController.putProductReview);

module.exports = router;