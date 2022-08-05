
const {DataTypes,Deferrable} = require('sequelize');
const Category = require('./Category.model');

module.exports = (sequelize) => {
    const Product = sequelize.define("t_product", 
        {
            name: {
                type: DataTypes.STRING,
                defaultValue:"",
            },
            maincategory_id:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            category_id:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            description:{
                type:DataTypes.TEXT,
                defaultValue:''
            },
            keywords:{
                type:DataTypes.TEXT,
                defaultValue:''
            },
            discount:{
                type:DataTypes.FLOAT(11,4),
                defaultValue:0,
            },
            price:{
                type:DataTypes.FLOAT(11,4),
                defaultValue:0,
            },
            quantity:{
                type:DataTypes.INTEGER,
                defaultValue:0,
            },

            // note:{
            //     type:DataTypes.TEXT,    // [{key:'',value:'',type:'html'}]
            //     defaultValue:'',
            // },

            // parentId:{
            //     type:DataTypes.INTEGER,
            //     defaultValue:0,
            // },

            // subIds:{
            //     type:DataTypes.TEXT,    // [1,2,3,4,5]
            //     defaultValue:'',
            // },

            // image:{
            //     type:DataTypes.STRING,
            //     defaultValue:'',
            // },
            image:{
                type:DataTypes.TEXT,
                defaultValue:JSON.stringify([{name:""}])              // ['1.jpg','2.jpg']
            },
            status:{
                type:DataTypes.INTEGER,
                defaultValue:1,
            },
            
            code:{
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

            // memory:{
            //     type:DataTypes.STRING,
            //     defaultValue: JSON.stringify({size:0,unit:'GB'})
            // },
            // technical:{
            //     type:DataTypes.TEXT,
            //     defaultValue:JSON.stringify([{key:"",value:""}])
            // }
        },
        {
            timestamps:false,
            freezeTableName: true
        }
    );

    // class ProductClass extends Product {}

    // ProductClass.init({
    //     mainCategoryId:{
    //         model:Category,
    //         key:'id',
    //         deferrable: Deferrable.INITIALLY_IMMEDIATE
    //     },
    //     categoryId:{
    //         model:Category,
    //         key:'id',
    //         deferrable: Deferrable.INITIALLY_IMMEDIATE
    //     },
    // })
    return Product;
};