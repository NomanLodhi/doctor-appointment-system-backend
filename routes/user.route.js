const express=require('express');
const { usersignIn,userRegister, editUser, deleteUser, getUser } = require('../controllers/user.controller');
const {authentication_middleware,authorizeRole} = require('../middlewares/authentication.middleware');
const route=express.Router();

route.post('/signup',userRegister)
route.post('/signin',usersignIn)  
route.get('/:email',authentication_middleware,authorizeRole('Admin','Doctor','Customer'),getUser);
route.patch('/edituser/:id',editUser)  
route.delete('/deleteuser/:id',deleteUser)  

module.exports=route;