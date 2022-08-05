const { validationResult } = require('express-validator');
const ResponseData = require('../utils/ResponseData');
const QPAY_API_URL = process.env.QPAY_API_URL;
const axios = require('axios');
const TransactionsModel = require('../models').transaction;

const QPay = () => {
    const _getEbarimt = async (token, payment_id) => {

        const formData = new FormData();
        formData.append("payment_id", payment_id);
        formData.append("ebarimt_receiver_type", "CITIZEN");
        const response = await axios.post(`${QPAY_API_URL}ebarimt/create`,
            formData, {
            headers: {
                ...formData.getHeaders(),
                "Content-Length": formData.getLengthSync(),
                'Authorization': `Bearer ${token}`,
                'Content-Type': '"multipart/form-data"'
            }
        });
        try {
            return { status: 200, data: response.data }
        } catch (err) {
            console.log(err);
            return { status: 500 }
        }
    }
    const _paymentCheck = async (token, invoice_id) => {
        try {

            const checkParam = {
                "object_type": "INVOICE",
                "object_id": invoice_id,
                "offset": {
                    "page_number": 1,
                    "page_limit": 100
                }
            }
            const response = await axios.post(`${QPAY_API_URL}payment/check`,
                checkParam, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return { result: response.data, status: 200 };
            } else {
                return { result: response.data, status: 201 };
            }
        } catch (err) {
            console.log(err)
            return { status: 500, result: err };
        }
    }
    const _payWithToken = async (invoice, token) => {
        const response = await axios.post(`${QPAY_API_URL}invoice`,
            invoice, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            //  console.log(response.data)
            return response.data;
        } else {
            return null;
        }

    }
    const _getAuthToken = async (username, password) => {
        const config = {
            auth: {
                username: username || process.env.QPAY_AUTH_TOKEN_USERNAME,
                password: password || process.env.QPAY_AUTH_TOKEN_PASSWORD
            }
        };

        const response = await axios.post(
            `${QPAY_API_URL}auth/token`, {}, config
        );

        if (response.status == 200 && response.data.access_token) {

            return response.data.access_token;
        }
        return null;
    }
    return {
        getAuthToken: _getAuthToken,
        payWithToken: _payWithToken,
        paymentCheck: _paymentCheck,
        getEbarimt: _getEbarimt,
    }
}

// pay and get invoice id
const pay = async (req, res) => {
    try {
        const payUsername = process.env.QPAY_AUTH_TOKEN_USERNAME;
        const payPassword = process.env.QPAY_AUTH_TOKEN_PASSWORD;
        const invoiceAlias = process.env.QPAY_INVOICE_ALIAS;
        const total = req.body.total;
        const token = await QPay().getAuthToken(payUsername, (payPassword));
        const invoice_number = Date.now();
        if (token == null) {
            return ResponseData.error(res, "Can not get Auth token.");
        } else {
            const sender_invoice_no = `INV-${req.user.id}-${invoice_number}`;
            const lines = [{
                line_description: `Order No ${sender_invoice_no} with ${total}`,
                line_quantity: 1.00,
                line_unit_price: total,
                taxes: [{
                    tax_code: "VAT",
                    description: "ebarimt",
                    amount: 0,
                    note: "ebarimt"
                }]
            }]

            const invoice = {
                invoice_code: (invoiceAlias || 'ELEC_MN_INVOICE'),
                sender_invoice_no: sender_invoice_no,
                invoice_receiver_code: `REC-QPAY-${invoice_number}`,
                invoice_description: `Payment for bought product`,
                sender_branch_code: process.env.QPAY_BRANCHE_CODE,
                amount: total,
                callback_url: `${process.env.REDIRECT_URL}payment/qpay/${sender_invoice_no}`,
                lines,
            }

            console.log(invoice);
            const qpay = await QPay().payWithToken(invoice, token);
            if (qpay != null) {
                return ResponseData.ok(res, "Saved invoice successful", { qpay,sender_invoice_no });
            } else {
                return ResponseData.warning(res, "Failed to create invoice");
            }
        }

    } catch (err) {
        console.log(err)
        return ResponseData.error(res, "Server error", { err });
    }

}

// get qpay transaction status 
const getStatus = async(req,res)=> {
    try{
        const transactionId = req.params.id;
        const transaction = await TransactionsModel.findOne({where:{transactionId}});
        return ResponseData.ok(res, "Saved invoice successful",transaction);
    }
    catch(err){
        console.log(err)
        return ResponseData.error(res, "Server error", { err });
    }
}
module.exports = {
    pay,
    getStatus
}