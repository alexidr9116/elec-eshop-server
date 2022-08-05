const { validationResult } = require('express-validator');
const ResponseData = require('../utils/ResponseData');
const Model = require('../models');
const DeliveryModel = Model.delivery;
const ProductModel = Model.product;
const TransactionModel = Model.transaction;
const OrderModel = Model.order;
const cryptoJs = require('crypto-js');

const putTransaction = async(req, res) => {
    try {
        const { billingAddress, transactionId, deliveryType, mode, carts } = req.body;

        if (JSON.parse(carts)) {
            const ids = [];
            const baskets = JSON.parse(carts);
            console.log(baskets);
            for (const p of baskets) {
                ids.push(p.id);
            }

            const products = await ProductModel.findAll({ where: { id: ids } });
            const productsJson = {};
            for (const product of products) {
                for (const _p of baskets) {
                    if (_p.id == product.id)
                        product.basketAmount = _p.amount;
                }
                // update stock amount  in mode != qpay case
                if (mode.toLowerCase() != 'qpay') {
                    await product.update({ quantity: Math.max(0, (product.quantity - product.basketAmount)) });
                }
                const key = cryptoJs.MD5(product.id).toString();

                const image = JSON.parse(product.image)[0].name;
                productsJson[key] = {
                        rowId: key,
                        id: product.id,
                        name: product.name,
                        qty: product.quantity,
                        price: product.price,
                        options: {
                            image,
                            category: product.category_id,

                        },
                        tax: 0,
                        subtotal: product.basketAmount * product.price
                    }
                    // create delivery
                await DeliveryModel.create({
                    billingAddress,
                    transactionId,
                    productId: product.id,
                    payer: req.user.id,
                    type: deliveryType,
                    mode, // paymode
                    isPaid: (mode.toLowerCase() != 'qpay'),
                    cost: product.price,
                    amount: product.basketAmount,
                })

            }

            // trnx create
            await TransactionModel.create({
                payer: req.user.id,
                ...req.body
            });

            const billing = JSON.parse(billingAddress);
            const current = new Date();

            await OrderModel.create({
                ordernumber: transactionId,
                client_id: req.user.id,
                name: `${req.user.firstname} ${req.user.lastname}`,
                email: req.user.email,
                phone: req.user.phone,
                address: `${billing.address} ${billing.town} ${billing.state}, ${billing.country}`,
                total: req.body.total,
                products: JSON.stringify(productsJson),
                created_at: current,
            });



            ResponseData.ok(res, 'Saved transaction');
        } else {
            ResponseData.error(res, 'JSON parse error')
        }
    } catch (err) {
        console.log(err)
        ResponseData.error(res, '', err)
    }
}
const getUserTransactions = async(req, res) => {
    try {
        const transactions = await TransactionModel.findAll({ where: { payer: req.user.id }, order: [
                ['createdAt', 'desc']
            ] });
        ResponseData.ok(res, 'Saved transaction', transactions);
    } catch (err) {
        console.log(err)
        ResponseData.error(res, '', err)
    }
}
module.exports = {
    putTransaction,
    getUserTransactions
}