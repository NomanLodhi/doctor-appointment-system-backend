const { DataTypes }=require('sequelize');
const sequelize=require('../config/db');
 
const orders=sequelize.define('order',{
    id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'users',
            key:'id'
        }
    },
    order_number:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    status:{
        type:DataTypes.ENUM('pending','confirmed','processing','shipped','delivered','cancelled'),
        defaultValue:'pending',
        allowNull:false
    },
    subtotal:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    discount:{
        type:DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
    shipping_charge:{
        type:DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
    total:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    shipping_address:{
        type:DataTypes.JSON,
        allowNull:false
    },
    notes:{
        type:DataTypes.TEXT
    }
})

module.exports=orders