const Message=require('../models/message');
const sequelize=require('../util/database');

const addMessage=async (req,res,next)=>{
    try{
        const message=req.body.message;
        console.log(message);
        const response=await Message.create({
            message:message,
            userId:req.user.id
        })
        //.then((response)=>{
            if(response){
                return res.status(201).json({message:"Message Sent"});
            }
        }
    catch(err){
        return res.status(404).json({message:'Something Went Wrong'});
    }
}
module.exports={
    addMessage,
}