const jsonwebtoken=require('jsonwebtoken');
require('dotenv').config();
const JWT_TOKEN=process.env.JWT;
const authentication_middleware=(req,res,next)=>{
    let check=req.headers.authorization || req.headers.Authorization;
    let token=check.split(' ')[1];
    if(!token){
        res.status(401).json({'msg':'Token not found'});
    }
    jsonwebtoken.verify(token,JWT_TOKEN,(err,decoded)=>{
        if(!check){
        return res.status(500).json({"msg":err.message}) ;
        }
         
        if(!decoded || !decoded.id || !decoded.role){ 
        return res.status(401).json({"msg":"Invalid Token"}) ;
        }
        req.user=decoded;
        next()
    })    
}
const authorizeRole=(...allowedRoles)=>{
return (req,res,next)=>{
    if(!req.user.role || !allowedRoles.includes(req.user.role)){
        return res.status(403).json({'msg':'Not allowed'});
    }
    next();
}
}
module.exports={authentication_middleware,authorizeRole};