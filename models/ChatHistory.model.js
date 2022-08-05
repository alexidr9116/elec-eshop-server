const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const ChatHistory = sequelize.define("chat", 
        {
            sender:{ type:DataTypes.INTEGER,},
            receiver:{type:DataTypes.INTEGER},
            message:{type:DataTypes.TEXT},
            isRead:{type:DataTypes.BOOLEAN, defaultValue:false},    
            type:{type:DataTypes.STRING,defaultValue:'text'}
        },
    );
    return ChatHistory;
};