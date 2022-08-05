const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Category = sequelize.define("t_category", 
        {
            catorder:{
                type:DataTypes.INTEGER,
                default:0,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue:"",
            },
            slug:{
                type:DataTypes.STRING,
                defaultValue:"",
            },
            description: {
                type: DataTypes.STRING,
                defaultValue:"",
            },
            total:{
                type:DataTypes.INTEGER,
            
            },
            parent_id:{
                type:DataTypes.INTEGER,
                defaultValue:0,
            },
            path:{
                type:DataTypes.STRING,
                defaultValue:''
            },
            image:{
                type:DataTypes.STRING,
                defaultValue:"",
            },
            status:{
                type:DataTypes.INTEGER,
                defaultValue:0,
            },
            created_at:{
                type:DataTypes.DATE,
                defaultValue:new Date()
            },
            updated_at:{
                type:DataTypes.DATE,
                defaultValue:new Date()
            },
            user_id:{
                type:DataTypes.INTEGER,
            }
        },
        {
            timestamps:false,
            freezeTableName: true
        },
        
    );
    return Category;
};