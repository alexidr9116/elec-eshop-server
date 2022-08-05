const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const BillingAddress = sequelize.define("billingAddress", 
        {
            fullName: {
                type: DataTypes.STRING,
                defaultValue:"",
            },
            phoneNumber:{
                type:DataTypes.STRING,
                defaultValue:"",
            },
            type: {
                type: DataTypes.STRING,
                defaultValue:"home",
            },
            address:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            town:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            state:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            zip:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            country:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            isDefault:{
                type:DataTypes.BOOLEAN,
                defaultValue:false,
            },
            owner:{
                type:DataTypes.INTEGER,
                defaultValue:0,
            },
            status:{
                type:DataTypes.INTEGER,
                defaultValue:1,         // 1: use, 2:delete
            },
        },
        {
            timestamps:false
        }
    );
    return BillingAddress;
};