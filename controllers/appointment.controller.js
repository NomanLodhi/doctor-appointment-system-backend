const transporter = require("../config/mailer");
const db = require("../models");

const bookAppointment=async(req,res)=>{
    try{
    const {appointment_date,patient_notes,start_time,end_time}=req.body;
    const {id}=req.user;    
    const meet_link='https://meet.google.com/abc-defg-hij';
    const {doctor_id}=req.params;
    const doctor= await db.users.findOne({where:{id:doctor_id,role:'Doctor'},attributes:['name','email']});
    const patient= await db.users.findOne({where:{id}});
    if(!doctor){
      res.status(401).json({'Status':'Error','msg':'No doctor found!!'});  
    }
    await db.Appointments.create({
        doctor_id:doctor_id,
        patient_id:id,
        appointment_date:appointment_date,
        start_time:start_time,
        end_time:end_time,
        meet_link:meet_link,
        patient_notes:patient_notes
    })
    await transporter.sendMail({
        from:'<nomanlodhi348@gmail.com>',
        to:doctor.email,
        subject:`Appointment booked by ${patient.name}`,
        html:`<h5>${patient.name} has booked an appointment</h5>
        <p>Hey ${doctor.name}!!!
        You have an appointment with ${patient.name} at ${start_time}.
        This is the link to the appointment <a href='${meet_link}'>${meet_link}</a>
        </p>
        `
    })
    await res.status(200).json({'Status':'Success','msg':`Appointment booked successfully!!`})   
    }

    catch(err){
     await res.status(401).json({'Status':'Error','msg':`Error while booking appointment ${err.message}`})   
    }
}
module.exports={bookAppointment}