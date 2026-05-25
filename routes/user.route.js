const express=require('express');
const { usersignIn,userRegister, editUser, deleteUser } = require('../controllers/user.controller');
const route=express.Router();

const usersignUproute=route.post('/signup',userRegister)
const usersignInroute=route.post('/signin',usersignIn)  
const edituserRoute=route.patch('/edituser/:id',editUser)  
const deleteuserRoute=route.delete('/deleteuser/:id',deleteUser)  

module.exports={usersignInroute,usersignUproute,edituserRoute,deleteuserRoute}