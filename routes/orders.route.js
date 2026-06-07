const app=require('express');
const routes=app.Router();
const {placeOrder, getmyOrders, getorderDetails, updateOrderstatus}=require('../controllers/orders.controller');
const { authentication_middleware, authorizeRole } = require('../middlewares/authentication.middleware');

routes.post('/',authentication_middleware,authorizeRole('Customer'),placeOrder);
routes.get('/my',authentication_middleware,authorizeRole('Customer'),getmyOrders);
routes.get('/:id',authentication_middleware,authorizeRole('Customer','Admin'),getorderDetails);
routes.patch('/:id',authentication_middleware,authorizeRole('Admin'),updateOrderstatus);

module.exports=routes;

