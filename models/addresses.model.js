const { DataTypes, UUIDV4 }=require('sequelize');
const sequelize=require('../config/db');

const addresses=sequelize.define('address',{
    id:{
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
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
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    province:{
        type:DataTypes.STRING,
        allowNull:false
    },
    postal_code:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=addresses;