const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Slider = sequelize.define("t_slider",
        {
           
            active:{
                type:DataTypes.INTEGER,
                defaultValue:1,
            },
            user_id:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            image:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            name:{
                type:DataTypes.STRING,
                defaultValue:''
            },
            created_at:{
                type:DataTypes.DATE,
                defaultValue:new Date(),
            },
            updated_at:{
                type:DataTypes.DATE,
                defaultValue:new Date(),
            }
        },
        {
            timestamps:false,
           
        }
    );
    return Slider;
};