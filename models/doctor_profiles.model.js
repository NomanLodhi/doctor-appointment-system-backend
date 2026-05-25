
const { DataTypes }=require('sequelize');
const sequelize=require('../config/db');


const doctor_profiles=sequelize.define('doctor_profile',{
    id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
    },
    specialization:{
        type:DataTypes.STRING,
        allowNull:false
    },
    bio:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fee:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
        model:'users',
        key:'id'
        }
    }
})
module.exports=doctor_profiles;