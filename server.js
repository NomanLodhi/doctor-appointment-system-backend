const app=require('./app');
const sequelize=require('./config/db')
const db=require('./models/index')

require('dotenv').config();
const PORT=process.env.PORT;


(async()=>{
    try{
        await sequelize.authenticate();
        await db.users.sync({});
        await db.doctor_profiles.sync({});
        await db.orders.sync({});
        await db.Appointments.sync({});
        await db.categories.sync({});
        await db.doctor_availability.sync({});
        await db.products.sync({});
        await db.addresses.sync({});
        await db.order_items.sync({});
        console.log('Database connected succesfully!!');
    }
    catch(err){
        console.log(`Error while connecting database ${err.message}`)
    }
})()

app.listen(PORT,(err)=>{
    if(err)console.log(`Error while starting server ${err.message}`)
    else console.log(`Server started at PORT:${PORT}`)
})