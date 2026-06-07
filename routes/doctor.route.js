const app=require("express");
const route=app.Router();
const {getAlldoctors, getSingledoctor}=require("../controllers/doctor.controller");
const {authentication_middleware,authorizeRole}=require("../middlewares/authentication.middleware");
route.get('/',getAlldoctors);
route.get('/:doctor_id',getSingledoctor);

module.exports=route;