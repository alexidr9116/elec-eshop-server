const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Order = sequelize.define("t_order",
        {
            ordernumber:{type:DataTypes.STRING}, 
            client_id:{type:DataTypes.INTEGER},
            name:{type:DataTypes.STRING},
            email:{type:DataTypes.STRING},
            phone:{type:DataTypes.STRING},
            address:{type:DataTypes.STRING},
            companyregister:{type:DataTypes.STRING},
            total:{type:DataTypes.FLOAT(11,2)},
            products:{type:DataTypes.TEXT},
            qpayid:{type:DataTypes.STRING},
            vat:{type:DataTypes.STRING},
            created_at:{type:DataTypes.DATE,defaultValue:new Date(),},
            is_shipped:{type:DataTypes.BOOLEAN,defaultValue:false},
        },
        {
            timestamps:false,
            freezeTableName: true
        }
    );
    return Order;
};