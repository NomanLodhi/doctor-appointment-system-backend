const { DataTypes }=require('sequelize');
const sequelize=require('../config/db');

const doctor_availability=sequelize.define('doctor_availability',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    doctor_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'users',
            key:'id'
        }
    },
    day_of_week:{
        type:DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        allowNull:false
    },
    start_time:{
        type:DataTypes.TIME,
        allowNull:false
    },
    end_time:{
        type:DataTypes.TIME,
        allowNull:false
    }
})
module.exports=doctor_availability;