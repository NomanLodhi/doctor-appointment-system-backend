const db=require('../models/index');
require('dotenv').config();
const bcryptjs=require('bcryptjs');

const getAlldoctors=async(req,res)=>{
    try{
    const doctor_profiles=await db.users.findAll({where:{role:'Doctor'},attributes:['name','email','phone'],include:[{model:db.doctor_profiles,attributes:['user_id','specialization','bio','fee','avatar']}]});        
    await res.status(200).json({'Status':'Success','data':doctor_profiles})
    }

    catch(err){
        await res.status(401).json({'Status':'Error','msg':`Error while getting doctors ${err.message}`})
    }
}
const getSingledoctor=async(req,res)=>{
    try{
    const {doctor_id}=req.params;    
    const doctor_profile=await db.users.findOne({where:{role:'Doctor',id:doctor_id},attributes:['name','email','phone'],include:[{model:db.doctor_profiles,attributes:['user_id','specialization','bio','fee','avatar']}]});        
    await res.status(200).json({'Status':'Success','data':doctor_profile})
    }

    catch(err){
        await res.status(401).json({'Status':'Error','msg':`Error while getting doctor ${err.message}`})
    }
}

module.exports={getAlldoctors,getSingledoctor}