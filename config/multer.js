const multer=require('multer');
const path  = require('path');
const roothpath=path.resolve(__dirname,'../')
const store=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(roothpath,'uploads'))
    },
    filename:(req,file,cb)=>{
    const imgName=Date.now()+Math.round(Math.random()*1E9)+path.extname(file.originalname);
    cb(null,file.fieldname+'_'+imgName);
    }
})
const storage=multer({
    storage:store
});

module.exports={storage}
