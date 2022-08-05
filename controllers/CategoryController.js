const {validationResult} = require('express-validator');
const ResponseData = require('../utils/ResponseData');
const Model = require('../models');
const CategoryModel = Model.category;
const CurrencyRateModel = Model.currencyRate;

const getLastCurrencyRates = async(req,res)=>{
    try{
        const rates = await CurrencyRateModel.findOne({
            order:[['createdAt','desc']]
        });
        ResponseData.ok(res,'',rates);
    }
    catch(err){
        console.log(err)
        ResponseData.error(res,'',err)
    }
}


const getAllCategories = async(req,res)=>{
    try{
        const categories = await CategoryModel.findAll({
            where:{status:1}, 
            order:[['parent_id','asc']]
        });
        ResponseData.ok(res,'',categories);
    }
    catch(err){
        console.log(err)
        ResponseData.error(res,'',err)
    }
}

module.exports = {
    getAllCategories,getLastCurrencyRates
}