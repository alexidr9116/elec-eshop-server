const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const User = sequelize.define("t_client",
        {
            // role:{
            //     type:DataTypes.STRING,
            //     defaultValue:'user',
            // },
            phone:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            password:{
                type:DataTypes.STRING,
                defaultValue:''
            },
            image:{
                type:DataTypes.STRING,
                defaultValue:'avatar.jpg',
            },
           
            age:{
                type:DataTypes.INTEGER,
            },
            bday:{
                type:DataTypes.DATEONLY,
            },
            ognoo:
            {
                type:DataTypes.DATE,
                defaultValue:new Date(),
            },
            email:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            // emailVerified:{
            //     type:DataTypes.BOOLEAN,
            //     defaultValue:false,
            // },

            firstname:{
                type:DataTypes.STRING,
                defaultValue:''
            },

            lastname:{
                type:DataTypes.STRING,
                defaultValue:''
            },
            gender:{
                type:DataTypes.INTEGER,
                defaultValue:1,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            remember_token:{
                type:DataTypes.TEXT,
                defaultValue:''
            }
        },
        {
            timestamps:false
        }
    );
    return User;
};