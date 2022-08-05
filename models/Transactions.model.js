const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Transcations = sequelize.define("transaction", 
        {
            transactionId:{
                type:DataTypes.STRING,
                default:''
            },
            virtualInvoice:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            currency:{
                type:DataTypes.STRING,
                default:"USD"
            },
            total:{
                type:DataTypes.FLOAT(11,2),
                default:0
            },
            payer:{
                type:DataTypes.INTEGER,
            },
            result:{
                type:DataTypes.TEXT,        // json data
                defaultValue:'',
            },
            mode:{
                type:DataTypes.STRING,
                default:'crypto'
            },
            status:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
        },
       
         
    );
    return Transcations;
};