const {bookAppointment}=require('../controllers/appointment.controller');
const app=require('express');
const { authentication_middleware, authorizeRole } = require('../middlewares/authentication.middleware');
const route=app.Router();

route.post('/:doctor_id',authentication_middleware,authorizeRole('Customer'),bookAppointment);

module.exports=route;