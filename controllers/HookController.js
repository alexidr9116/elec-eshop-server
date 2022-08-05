const { validationResult } = require('express-validator');
const ResponseData = require('../utils/ResponseData');
const Models = require('../models');

const TransactionModel = Models.transaction;
const OrderModel = Models.order;
const ProductModel = Models.product;
const DeliveryModel = Models.delivery;

const QPayHook = async(req, res) => {
    try {
        try {
            const { invoice } = req.params;
            // goal is 
            // transaction, delivery => paid => to completed,
            // update stock amount
        

            const transaction = await TransactionModel.findOne({
                where: { virtualInvoice: invoice }
            })

            if (transaction != null) {
                transaction.update({ status: 'COMPLETED', updatedAt: new Date() });
            }
            await DeliveryModel.update({ isPaid: 1 }, { where: { transactionId: transaction.transactionId } });

            const productIds = [];
            // update stock amount
            const orders = await OrderModel.findOne({ where: { ordernumber:  transaction.transactionId } });
            if (orders != null) {
                await orders.update({ qpayid:  transaction.transactionId });
                const deliveries = await DeliveryModel.findAll({where:{transactionId:transaction.transactionId}});
                for (const row of deliveries) {
                    const product = await ProductModel.findByPk(row.productId);
                    if(product!=null)
                    await product.update({ quantity: Math.max(0, product.quantity - row.amount) });
                }
            }

            console.log("QPayment system was successfully done")
        } catch (err) {
            console.log(err, " is payment hook  error");
        }
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err)
        ResponseData.error(res, '', err)
    }
}

module.exports = {
    QPayHook,
}