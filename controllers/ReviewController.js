const { validationResult } = require('express-validator');
const ResponseData = require('../utils/ResponseData');
const Model = require('../models');
const ReviewModel = Model.review;

const putProductReview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;
        const reviews = await ReviewModel.findAll({ where: { productId, publisher: req.user.id } });
       
        if (reviews.length == 0) {
            await ReviewModel.create({
                rating, comment, productId, publisher: req.user.id, published: new Date()
            });
            ResponseData.ok(res, 'Reported review');
        }
        else {
            ResponseData.warning(res, 'Your review already exist ');
        }
    }
    catch (err) {
        console.log(err)
        ResponseData.error(res, 'Fatal Error', err)
    }

}
const getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await ReviewModel.findAll({
            where: { status: 1, productId },
            order: [['rating', 'desc']]
        });
        ResponseData.ok(res, '', reviews);
    }
    catch (err) {
        console.log(err)
        ResponseData.error(res, '', err)
    }
}

module.exports = {
    getReviewsByProductId,
    putProductReview
}