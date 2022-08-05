const { validationResult } = require('express-validator');
const ResponseData = require('../utils/ResponseData');
const Models = require('../models');
const { Op, } = require('sequelize');
const CategoryModel = Models.category;
const UserModel = Models.user;
const ProductModel = Models.product;
const ReviewModel = Models.review;
const DeliveryModel = Models.delivery;
const BannerImageModel = Models.bannerImages;
const OrderModel = Models.order;
const TransactionModel = Models.transaction;

const getAllProducts = async (req, res) => {
    try {
        await ProductModel.hasOne(CategoryModel, { foreignKey: 'id', sourceKey: 'category_id' });
        await ProductModel.hasMany(ReviewModel, { foreignKey: 'productId' });
        
        const products = await ProductModel.findAll({
            where: { status: 1 },
            order: [['updated_at', 'desc'], ['name', 'asc']],
            include: [ReviewModel]
        }
        );
        ResponseData.ok(res, 'get hot products', products);
    }

    catch (err) {
        console.log(err);
        ResponseData.error(res, '', err);
    }
}
const getBannerImages = async(req,res)=>{
    try{
        
        const images = await BannerImageModel.findAll({where:{active:1}});
        ResponseData.ok(res, 'get banner images', images);
    }
    catch(err)
    {
        console.log(err);
        ResponseData.error(res, '', err);
    }
    

}
const getProductsByIds = async(req,res)=>{
    try{
        const {ids}= req.body;
        await ProductModel.hasOne(CategoryModel, { foreignKey: 'id', sourceKey: 'category_id' });
        await ProductModel.hasMany(ReviewModel, { foreignKey: 'productId' });
    
        const products = await ProductModel.findAll({
            where: { id:ids},
            order: [['updated_at', 'desc'], ['name', 'asc']],
            include: [
                {
                    model: ReviewModel
                },
                {
                    model: CategoryModel,
                    attributes: ['name', 'slug']
                }
            ]
        });
        ResponseData.ok(res, 'get products by id array', products);
    }

    catch (err) {
        console.log(err);
        ResponseData.error(res, '', err);
    }
}
const getProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        await ReviewModel.hasOne(UserModel, { foreignKey: 'id', sourceKey: 'publisher' })
        await ProductModel.hasOne(CategoryModel, { foreignKey: 'id', sourceKey: 'maincategory_id' });
        await ProductModel.hasMany(ReviewModel, { foreignKey: 'productId' });
        const product = await ProductModel.findOne({
            where: { id },
            order: [['updated_at', 'desc'], ['name', 'asc']],
            include: [
                {
                    model: ReviewModel,
                    include: {
                        model: UserModel,
                        attributes: ['firstname', 'lastname', 'image', 'email']
                    }
                },
                {
                    model: CategoryModel,
                    attributes: ['name', 'slug']
                }
            ]
        });
        if (product != null)
            ResponseData.ok(res, 'got product', product);
        else
            ResponseData.warning(res, `didn't got product`);
    }
    catch (err) {
        console.log(err);
        ResponseData.error(res, '', err);
    }
}
const getDeliveryOrders = async(req,res)=>{
    try {
        ProductModel.hasMany(ReviewModel, { foreignKey: 'productId' });
        DeliveryModel.hasOne(ProductModel,{foreignKey:'id',sourceKey:'productId'});

        // const orders = await OrderModel.findAll({where:{client_id:req.user.id, qpayid:{[Op.ne]: null} }})
        
        const orders = await DeliveryModel.findAll({
            where:{payer:req.user.id, [Op.or]: [{ status: '' }, { status:'completed' }, { status:'start' }], isPaid:1},
            // where:{payer:req.user.id, [Op.or]: [{ status: '' }, { status:'start' }], isPaid:0},
            order: [['updatedAt', 'desc']],
            include:[
                {
                    model: ProductModel,
                    include:{
                        model:ReviewModel
                    },
                },
            ]
        });
        
        ResponseData.ok(res, 'get delivery products', orders);
    }
    catch (err) {
        console.log(err);
        ResponseData.error(res, '', err);
    }
}
const getHotProducts = async (req, res) => {
    try {
        await ProductModel.hasOne(CategoryModel, { foreignKey: 'id', sourceKey: 'category_id' });
        await ProductModel.hasMany(ReviewModel, { foreignKey: 'productId' });
        const products = await ProductModel.findAll({
            order: [['updated_at', 'desc'], ['name', 'asc']],
            limit: 12,
            include: [ReviewModel]
        }
        );
        ResponseData.ok(res, 'get hot products', products);
    }
    catch (err) {
        console.log(err);
        ResponseData.error(res, '', err);
    }
}

module.exports = {
    getAllProducts,
    getHotProducts,
    getProductDetail,
    getProductsByIds,
    getDeliveryOrders,
    getBannerImages
}