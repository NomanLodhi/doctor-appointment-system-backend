const { where } = require('sequelize');
const db=require('../models/index');
const nodemailer=require('nodemailer');
const transporter  = require('../config/mailer');



const placeOrder=async(req,res)=>{
    try{
        const {product_id,quantity,discount,shipping_address,notes,shipping_charge}=req.body;
        const user_id=req.user.id;
        const product=await db.products.findOne({where:{id:product_id}});
        const user=await db.users.findOne({where:{id:user_id}});
        const actualPrice=product.sale_price ?? product.price;
        const subtotal= actualPrice * quantity;
        const discountAmount=(subtotal * discount) /100;
        const total=subtotal-discountAmount+shipping_charge;
        const order_number="ORD-"+Date.now();
        await db.orders.create({
            user_id:user_id,
            order_number:order_number,
            discount:discount,
            total:total,
            subtotal:subtotal,
            shipping_address:shipping_address,
            shipping_charge:shipping_charge,
            notes:notes,
            order_items:{
                product_id:product_id,
                productId:product_id,
                product_name:product.name,
                quantity:quantity,
                unit_price:actualPrice,
                total_price:total
            }
        },{
            include:[db.order_items]
        })
        const info=await transporter.sendMail({
            from:`<nomanlodhi348@gmail.com>`,
            to:user.email,
            subject:'Your order has been placed',
            html:`<p>${user.name} your order has been received you'll receive your order with 5 week days.</p>`
        })
        await res.status(200).json({"Status":"Success","data":"Order placed successfully!!"});
        } 
        catch(err){
            await res.status(401).json({"Status":"Error","msg":`Error while placing order ${err.message}`})
        }
}
const getmyOrders=async(req,res)=>{
    try{
        const id=req.user.id;
        const order= await db.orders.findAll({
            attributes:['order_number','status','subtotal','total','shipping_address','notes'],
            include:[{model:db.order_items,
            attributes:['product_name','quantity','unit_price']
            }
        ]
            },{where:{user_id:id}});
            await res.status(200).json({'Status':'Success','msg':order})
        }

    catch(err){
        await res.status(401).json({'Status':'Error','msg':`Error while getting order ${err.message}`})
    }
}
const getorderDetails=async(req,res)=>{
    try{
    const {id}=req.params;
     const order= await db.orders.findOne({
            where:{id:id},
            attributes:['order_number','status','subtotal','total','shipping_address','notes'],
            include:[{model:db.order_items,
            attributes:['product_name','quantity','unit_price']
            }]});
    await res.status(200).json({'Status':'Success','data':order})
    }
    catch(err){
    await res.status(401).json({'Status':'Error','msg':`Error while getting order details ${err}`})
    }
}
const updateOrderstatus=async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;
        await db.orders.update({status:status},{where:{id:id}})
        await res.status(200).json({"Status":"Success","msg":`Status updated to ${status}`})   
    }
        
    catch(err){
     await res.status(401).json({"Status":"Error","msg":`Error while updating status ${err.message}`})   
    }
}
module.exports={placeOrder,getmyOrders,getorderDetails,updateOrderstatus}