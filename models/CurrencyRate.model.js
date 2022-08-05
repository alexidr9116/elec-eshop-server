const {DataTypes} = require('sequelize');

module.exports=(sequelize)=>{
    const CurrencyRate = sequelize.define('currencyRate',{
        usd:{type:DataTypes.INTEGER(1), defaultValue:1},
        mnt:{type:DataTypes.FLOAT(11,2),defaultValue:3129.54},
        rmb:{type:DataTypes.FLOAT(11,2),defaultValue:6.67},  
    })
    return CurrencyRate;
}