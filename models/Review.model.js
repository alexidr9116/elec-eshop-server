const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Review = sequelize.define("review", 
        {
            productId:{type:DataTypes.INTEGER, defaultValue:0},
            rating:{type:DataTypes.FLOAT(2,1),defaultValue:0},
            publisher:{type:DataTypes.INTEGER}, // user table
            published:{type:DataTypes.DATE,defaultValue:new Date()},    
            comment:{type:DataTypes.STRING,defaultValue:''},
            status:{
                type:DataTypes.INTEGER,
                defaultValue:0,
            },
        },
         
    );
    return Review;
};