const {DataTypes}=require('sequelize');
const sequelize=require('../config/db');

const products=sequelize.define('product',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    category_id:{
    type:DataTypes.UUID,
    allowNull:false,
    references:{
        model:'categories',
        key:'id'
    }},
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    slug:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    sale_price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:true
    },
    stock_quantity:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    sku:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    images:{
        type:DataTypes.JSON,
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
            
    
})

module.exports=products;