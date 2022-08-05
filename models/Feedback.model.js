const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Feedback = sequelize.define("t_feedback",
        {
           
            phone:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
           
            email:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            feedback:{
                type:DataTypes.TEXT,
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
            freezeTableName: true
        }
    );
    return Feedback;
};