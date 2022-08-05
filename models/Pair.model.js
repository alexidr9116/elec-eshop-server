const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Pair = sequelize.define("pair", 
        {
            key:{type:DataTypes.STRING,defaultValue:''},
            value:{type:DataTypes.STRING,defaultValue:''},
            type:{type:DataTypes.STRING,defaultValue:'support-country'}, // user table
            status:{
                type:DataTypes.INTEGER,
                defaultValue:0,
            },
        },
        {timestamps:false}
         
    );
    return Pair;
};