const { DataTypes }=require('sequelize');
const sequelize=require('../config/db');

const categories=sequelize.define('category',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    slug:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
module.exports=categories
