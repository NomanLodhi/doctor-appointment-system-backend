const app=require("express");
const route=app.Router();
const {}=require("../controllers/doctor.controller");
const {authentication_middleware,authorizeRole}=require("../middlewares/authentication.middleware");
