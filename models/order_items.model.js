const { DataTypes }=require('sequelize');
const sequelize=require('../config/db');
const db=require('./index')
const order_items=sequelize.define('order_item',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    order_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{ 
            model:'orders',
            key:'id'
        }
    },
    product_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'products',
            key:'id'
        }
    },
    product_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    unit_price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    total_price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    }
})
module.exports=order_items;