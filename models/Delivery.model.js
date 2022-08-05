const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Delivery = sequelize.define("t_delivery", 
        {
            transactionId:{type:DataTypes.STRING,defaultValue:''},
            productId:{type:DataTypes.INTEGER},
            amount:{type:DataTypes.INTEGER,defaultValue:0},
            cost:{type:DataTypes.FLOAT(11,4),defaultValue:0},
            currency:{type:DataTypes.STRING,defaultValue:'USD'},
            payer:{type:DataTypes.INTEGER}, 
            type:{type:DataTypes.STRING}, 
                  // faster, normal
            status:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            isPaid:{
                type:DataTypes.BOOLEAN,
                defaultValue:false,
            },
            billingAddress:{
                type:DataTypes.TEXT,
                default:""                      // json
            },
            mode:{
                type:DataTypes.STRING,
                defaultValue:'crypto',
            }
        },
    );
    return Delivery;
};