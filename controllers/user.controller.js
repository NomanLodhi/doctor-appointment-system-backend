const JWT=require('jsonwebtoken');
const validator=require('validator');
const bcryptjs=require('bcryptjs');
const nodemailer=require('nodemailer');
const db=require('../models/index');
const { where } = require('sequelize');
require('dotenv').config();
const jwt_token=process.env.JWT;

const transporter=nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      auth:{
         user:process.env.SMTP_USER,
         pass:process.env.SMTP_PASSWORD
      }
     });

const userRegister=async(req,res)=>{
    try{
      const {name,email,phone,role,gender,password,city,province,postal_code}=req.body;
      if(!name || !email || !phone || !role || !gender || !password || !city || !province || !postal_code){
         await res.status(401).json({'msg':'All fields are required!!'});
      }
      
      if(!validator.isEmail(email)){
         await res.status(401).json({'msg':'Email is not correct!!'});
      }
      
     const SALT=await bcryptjs.genSalt(10);
     const MIX=await bcryptjs.hash(password,SALT)
     const userRegistered= await db.users.create({name:name,email:email,phone:phone,role:role,gender:gender,password:MIX,
      addresses:{
         city:city,
         province:province,
         postal_code:postal_code
      }
   },{
      include:[db.addresses]
   })
   await res.status(200).json({'status':'Success','data':userRegistered});
   const info=await transporter.sendMail({
      from:"<nomanlodhi348@gmail.com>",
      to:email,
      subject:"Welcome to al haseeb dawakhana",
      html:`
      <h1>Welcome ${name} to Al Haseeb dawakhana</h1>
      <p>Now you can purchase our products and book appointments from our doctors</p>
      `
   })
     
    }
    catch(err){ 
       await res.status(401).json({'Status':'Error','msg':`Error while sign up ${err.message}`})
    }
}


const usersignIn=async(req,res)=>{
    try{
    const {email,password}=req.body;
    if(!email,!password){
      await res.status(401).json({'Status':'Error','msg':'All field are required!!'});
   }
   const user=await db.users.findOne({where:{email}});
   if(!user){
       await res.status(401).json({'Status':'Error','msg':'User not found!!'});
      }
   const compare= await bcryptjs.compare(password,user.password);
   if(!compare){
   await res.status(401).json({'Status':'Error','msg':'Incorrect Password!!'});
     };
   const genToken=(email)=>{
      return JWT.sign({email},jwt_token,{expiresIn:'24h'})
   }
   const token=genToken(email);
   await res.status(200).json({'msg':'User sign in!!','Token':token});
  
    }
    catch(err){ 
       await res.status(400).json({'msg':`Error while sign in ${err.message}`})
    }
}

const editUser=async(req,res)=>{
   try{
   const {name,email,phone,password,city,province,postal_code}=req.body;
   const {id}=req.params;
   const SALT=await bcryptjs.genSalt(10);
   const newPassword=await bcryptjs.hash(password,SALT)
   const editUser=await db.users.update({name:name,email:email,phone:phone,password:newPassword},{where:{id}})
   const  updateAddress=await db.addresses.update({
         city:city,
         province:province,
         postal_code:postal_code
      },{where:{user_id:id}})
   await res.status(200).json({'Status':'Success','msg':'User updated successfully!!'})
   }
   catch(err){
      await res.status(401).json({'Status':'Error','msg':`Error while editing user ${err}`})
   }
}

const deleteUser=async(req,res)=>{
  try{
    const {id}=req.params;
   await db.users.destroy({where:{id}});
   await res.status(200).json({'status':'success','msg':'user deleted successfullty!!'});
}
catch(err){
   await res.status(401).json({'status':'error','msg':`error while deleting user ${err}`});
    }
}

module.exports={usersignIn,userRegister,editUser,deleteUser}