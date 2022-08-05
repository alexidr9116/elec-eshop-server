const { validationResult } = require('express-validator');
const db = require('../models');
const BillingAddressModel = db.billing;
const PairModel = db.pair;
const FeedbackModel = db.feedback;
const SiteFeedbackModel = db.siteFeedback;
const { Op } = require('sequelize');

const User = db.user;
const fs = require('fs');
const path = require('path');
const ResponseData = require('../utils/ResponseData');
const { ResponseUserModel } = require('./AuthController');

// key value pair
const getPairs = async (req, res) => {
    try {
        const pairs = await PairModel.findAll({
            where: { status: 1 },
            order: [['type', 'asc']]
        });
        return ResponseData.ok(res, "saved billing address", pairs);
    }
    catch (err) {

    }
}
const getBillingAddress = async (req, res) => {
    try {
        BillingAddressModel.hasOne(PairModel, { foreignKey: 'id', sourceKey: 'country' });

        const address = await BillingAddressModel.findAll({
            where: { status: 1, owner: req.user.id },
            include: [PairModel]
        });
        return ResponseData.ok(res, "get billing address", address);

    }
    catch (err) {
        return ResponseData.error(res, "Internal Server Error");
    }
}
const deleteBillingAddress = async (req, res) => {
    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {
        await BillingAddressModel.destroy({ where: { id: req.params.id,owner:req.user.id } });
        return ResponseData.ok(res, "delete billing address");

    }
    catch (err) {
        console.log(err)
        return ResponseData.error(res, "Internal Server Error");
    }
}
const putBillingAddress = async (req, res) => {
    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {
        if (req.body.id) {
            const ba = await BillingAddressModel.findByPk(req.body.id).update({ ...req.body });
            return ResponseData.ok(res, "saved billing address", ba);
        }
        else {

            if (req.body.isDefault)
                await BillingAddressModel.update({ isDefault: false }, { where: { owner: req.user.id } });
            await BillingAddressModel.create({ ...req.body, owner: req.user.id });
            return ResponseData.ok(res, "saved billing address", {});
        }
    }
    catch (err) {
        console.log(err)
        return ResponseData.error(res, "Internal Server Error");
    }
}
const setProfile = async (req, res) => {
    if (req.file) {
        var result = validationResult(req);
        if (!result.isEmpty()) {
            fs.unlink(path.resolve(req.file.path), (err) => { });
            return ResponseData.error(res, result.array()[0].msg);
        }

    }
    try {
        let user = await User.findByPk(req.user.id);
        if (req.file)
            user.image = req.file.path;

        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.bday = new Date(req.body.bday);
        await user.save();
        ResponseData.ok(res, "Profile was changed", ResponseUserModel(user));
    } catch (error) {
        console.log(error);
        ResponseData.error(res, "Not saved", error);
    }

}
const setFeedback = async(req,res)=>{
    var result = validationResult(req);
    if (!result.isEmpty()) {
       
        return ResponseData.warning(res, result.array()[0].msg);
    }
    try {
        const {name,email,phone,feedback} = req.body;
        await FeedbackModel.create({
            name,
            email,
            phone,
            feedback
        })
        ResponseData.ok(res, "Your feedback was deliveried");
    } catch (error) {
        console.log(error);
        ResponseData.error(res, "Your feedbak not deliveried", error);
    }

}
const getSiteFeedback = async(req,res)=>{
    try {
        SiteFeedbackModel.hasOne(User, { foreignKey: 'id', sourceKey: 'user_id' });

        const feedbacks = await SiteFeedbackModel.findAll({
            where: { active: true,rating:{[Op.gte]:3} },
            include: [User]
        });
        return ResponseData.ok(res, "get site feedbacks", feedbacks);

    }
    catch (err) {
        return ResponseData.error(res, "Internal Server Error");
    }
}
const setSiteFeedback = async(req,res)=>{
    var result = validationResult(req);
    if (!result.isEmpty()) {
       
        return ResponseData.warning(res, result.array()[0].msg);
    }
    try {
        const {rating,feedback} = req.body;

        await SiteFeedbackModel.create({
            user_id:req.user.id,
            email:req.user.email,
            rating,
            feedback
        })
        ResponseData.ok(res, "Your Site Feedback was deliveried");
    } catch (error) {
        console.log(error);
        ResponseData.error(res, "Your Site Feedbak not deliveried", error);
    }

}
module.exports = {
    putBillingAddress,
    getPairs,
    getBillingAddress,
    deleteBillingAddress,
    setProfile,
    setFeedback,
    setSiteFeedback,
    getSiteFeedback
}