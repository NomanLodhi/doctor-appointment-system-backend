const express=require('express');
const cors=require('cors');
const user = require('./routes/user.route');
const admin = require('./routes/admin.route');
const order = require('./routes/orders.route');
const doctor = require('./routes/doctor.route');
const appointment= require('./routes/appointment.route');
const app=express();
app.use(express.json());
app.use(cors('http://localhost:5173/'));
app.use('/files',express.static('uploads'));
// CRUD endpoints
app.use('/api/user/v1',user);
app.use('/api/orders/v1',order);
app.use('/api/admin/categories/v1',admin);
app.use('/api/admin/products/v1',admin);
app.use('/api/admin/orders/v1',admin);
app.use('/api/admin/doctors/v1',admin);
app.use('/api/doctors/v1',doctor);
app.use('/api/appointment/v1',appointment);


module.exports=app;