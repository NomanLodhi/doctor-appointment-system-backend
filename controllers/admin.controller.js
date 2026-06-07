const db=require('../models/index');
const fs=require('fs');
const path=require('path');
const bcryptjs=require('bcryptjs');
const { where, Sequelize } = require('sequelize');
const transporter = require('../config/mailer');


const uploadCategory=async(req,res)=>{
try{
const {name,slug}=req.body;
const image=req.file.filename;
await db.categories.create({name:name,slug:slug,image:image});
await res.status(200).json({'status':'success','msg':'category uploaded successfully'})
}
catch(err){
    await res.status(400).json({'status':'error','msg':`error while uploading category ${err}`})
}
}
const editCategory=async(req,res)=>{
    try{
        const {name,slug}=req.body;
        const image=req.file.filename;
        const {id}=req.params;
        const category=await db.categories.findOne({where:{id:id}});
        if(!category){
        await res.status(401).json({'status':'error','msg':'No category found'});
        }
        const rootPath=path.resolve(__dirname,'../');
        const imagePath=path.join(rootPath,'uploads',category.image);
        fs.unlink(imagePath,(err)=>{
            if(err){
                res.status(401).json({'msg':`Error while deleting image ${err}`})
            }
        })
        await db.categories.update({name:name,slug:slug,image:image},{where:{id:id}});
        await res.status(200).json({'status':'success','msg':`category edited successfully!`})
    }
    catch(err){
        await res.status(401).json({'status':'error','msg':`error while editing category ${err}`})
    }
}
const deleteCategory=async(req,res)=>{
    try{
        
        const {id}=req.params;
        const category=await db.categories.findOne({where:{id:id}});
        if(!category){
        await res.status(401).json({'status':'error','msg':'No category found'});
        }
        const rootPath=path.resolve(__dirname,'../');
        const imagePath=path.join(rootPath,'uploads',category.image);
        fs.unlink(imagePath,(err)=>{
            if(err){
                res.status(401).json({'msg':`Error while deleting image ${err}`})
            }
        })
        await db.categories.destroy({where:{id:id}});
        await res.status(200).json({'status':'success','msg':`category deleted successfully!`})
    }
    catch(err){
        await res.status(401).json({'status':'error','msg':`error while deleting category ${err}`})
    }
}
const uploadProduct=async(req,res)=>{ 
    try{
        const {name,slug,description,price,sale_price,stock_quantity,sku}=req.body;
        const {category_id}=req.params;
        const images=req.files;
        const image=[];
        images.forEach(img=>{
            image.push(img.filename);
        })
        const product=await db.products.create({name:name,slug:slug,description:description,price:price,sale_price:sale_price,stock_quantity:stock_quantity,sku:sku,images:image,category_id:category_id,categoryId:category_id});
        await res.status(200).json({'status':'success','msg':'product added successfully!!'});

    }
    catch(err){
        await res.status(401).json({'status':'error','msg':`error while uploading product ${err}`});
    }
}
const deleteProduct=async(req,res)=>{
    try{
        const {id}=req.params;
        const product= await db.products.findOne({where:{id:id}});
        if(!product){
            await res.status(401).json({'msg':'product not found!!'});
        }
        const image=JSON.parse(product.images);
        const rootPath=path.resolve(__dirname,'../');
 
        image.forEach(img=>{
            const imagePath=path.join(rootPath,'uploads',img);
            fs.unlink(imagePath,(err)=>{
                if(err){
                res.status(401).json({'msg':`error while deleting images ${err}`})
                }
            })
            console.log(img)
        })
        await db.products.destroy({where:{id:id}});
        await res.status(200).json({'status':'success','msg':'product deleted successfully!!'});
    }
    catch(err){
        await res.status(401).json({'status':'error','msg':`error while deleting product ${err}!!`})
    }
}
const editProduct=async(req,res)=>{
try{
    const {id}=req.params;
    const {name,slug,description,price,sale_price,stock_quantity,sku}=req.body;
    const newimages=req.files;
    const productRow=await db.products.findOne({where:{id:id}});
    if(!productRow){
        await res.status(401).json({'status':'error','msg':'No product found!!'});
    }
    const existingImages=JSON.parse(productRow.images);
    const images=[];
    const newArray= newimages.forEach(img=>images.push(img.filename))
    const newImages=[...existingImages,...images];
    
    
    await db.products.update({name:name,slug:slug,description:description,price:price,sku:sku,sale_price:sale_price,stock_quantity:stock_quantity,images:newImages},{where:{id:id}});
    await res.status(200).json({'status':'success','msg':'product edited successfully!!'})
}
catch(err){ 
    await res.status(401).json({'status':'error','msg':`error while editing product ${err.message}`})
}

}
const deleteImage=async(req,res)=>{
try{
    const {imgName,id}=req.params;
    const imageRow=await db.products.findOne({where:{id:id}});
    if(!imageRow.images){
        await res.status(401).json({'status':'error','msg':'No image found!!'});
    }
    const updateArray=JSON.parse(imageRow.images).filter(img=> img !== imgName);
    const rootPath=path.resolve(__dirname,'../');
    fs.unlink(path.join(rootPath,'uploads',imgName),(err)=>{
        if(err){
            res.status(401).json({'status':'error','msg':`${err.message}`});
        }
    });
    
    await db.products.update({images:updateArray},{where:{id:id}});
    await res.status(200).json({'status':'success','msg':'image deleted successfully!!'})
}
catch(err){ 
    await res.status(401).json({'status':'error','msg':`error while deleting image ${err.message}`})
}

}
const getAllorders=async(req,res)=>{
    try{
    const orders=await db.orders.findAll({attributes:['order_number','status','subtotal','total','shipping_address','notes','user_id'],include:[{model:db.order_items}]});
    
    await res.status(200).json({"Status":"Success","data":orders})
    }
        
    catch(err){
        await res.status(400).json({"Status":"Error","msg":`Error while getting orders ${err.message}`})
    }
}
const getSingleorder=async(req,res)=>{
    try{
     const {id}=req.params   
    const order=await db.orders.findOne({where:{id},attributes:['order_number','status','subtotal','total','shipping_address','notes','user_id'],include:[{model:db.order_items}]});
    await res.status(200).json({"Status":"Success","data":order})
    }
        
    catch(err){
        await res.status(400).json({"Status":"Error","msg":`Error while getting order ${err.message}`})
    }
}
const registerDoctor=async(req,res)=>{
    try{
    const {name,email,password,phone,role,gender,specialization,bio,fee}=req.body;
    const doctor_avatar=req.file.filename;
    if(!name || !email || !password || !role || !gender || !specialization || !bio || !fee || !phone){
        await res.status(401).json({"msg":"All fields are required!!"});
    }    
     const user_id=req.user.id;
     const SALT=await bcryptjs.genSalt(10);
     const MIX=await bcryptjs.hash(password,SALT);
     await db.users.create({
        name:name,
        email:email,
        password:MIX,
        phone:phone,
        role:role,
        gender:gender,
        doctor_profile:{
            specialization:specialization,
            bio:bio,
            avatar:doctor_avatar,
            fee:fee
        }
     },{
      include:[db.doctor_profiles]
   })
    await transporter.sendMail({
        from:"<nomanlodhi348@gmail.com>",
        to:email,
        subject:`Congrates ${name} you have been joined our online clinic`,
        html:`<h1>Congrates ${name} you have been joined our online clinic</h1>
        <p>Looking forward working with you.</p>
        `
    })
    await res.status(200).json({"Status":"Success","Data":"Doctor registered successfully!!"})
    }
    catch(err){
        await res.status(401).json({"Status":"Error","msg":`Error while registring doctor ${err}!!`})
    }
}
const editDoctor=async(req,res)=>{
    try{
    const {name,email,password,phone,role,gender,specialization,bio,fee}=req.body;
    const {doctor_id}=req.params;
    const doctor_avatar=req.file.filename
    const SALT=await bcryptjs.genSalt(10);
    const MIX=await bcryptjs.hash(password,SALT);
    const doctor=await db.users.findOne({where:{id:doctor_id}});
    if(!doctor){
     await res.status(404).json({"Status":"Error","msg":"Doctor not found!!"})    
    }
    await db.users.update({
        name:name,
        email:email,
        password:MIX,
        phone:phone,
        role:role,
        gender:gender
    },{where:{id:doctor_id}})
    await db.doctor_profiles.update({
        specialization:specialization,
            bio:bio,
            avatar:doctor_avatar,
            fee:fee
    },{where:{user_id:doctor_id}})
    
    await res.status(200).json({"Status":"Success","Data":"Doctor edited successfully!!"})
}
catch(err){
    await res.status(401).json({"Status":"Error","msg":`Error while editing doctor ${err}!!`})
    }
}
const doctorSchedule=async(req,res)=>{
    try{
    const {day_of_week,start_time,end_time}=req.body;    
    const {doctor_id}=req.params;    
    await db.doctor_availability.create({
        day_of_week:day_of_week,
        start_time:start_time,
        end_time:end_time,
        doctor_id:doctor_id,
        user_id:doctor_id
    })
    await res.status(200).json({"Status":"Success","msg":`Schedule set successfully!!`});
    }
    
    catch(err){
    await res.status(401).json({"Status":"Error","msg":`Error setting schedule ${err.message}`})
    }
}
const deleteDoctor=async(req,res)=>{
    try{
    const {doctor_id}=req.params;
    await db.users.destroy({where:{id:doctor_id}});    
    await res.status(200).json({"Status":"Success","msg":`Doctor deleted successfully!!`});    
    }
    catch(err){
    await res.status(400).json({"Status":"Error","msg":`Error while deleting doctor ${err.message}`})    
    }
}
module.exports={uploadCategory,editCategory,deleteCategory,uploadProduct,deleteProduct,editProduct,deleteImage,getAllorders,getSingleorder,registerDoctor,doctorSchedule,deleteDoctor,editDoctor};