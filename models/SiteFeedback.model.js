const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const SiteFeedback = sequelize.define("site_feedback",
        {
            user_id:{
                type:DataTypes.INTEGER,
                
            },
            email:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            feedback:{
                type:DataTypes.TEXT,
                defaultValue:'',
            },
            rating:{
                type:DataTypes.FLOAT(2,1),
                
            },
            active:{
                type:DataTypes.BOOLEAN,
                defaultValue:true
            }
        },
        {
            freezeTableName: true
        }
    );
    return SiteFeedback;
};