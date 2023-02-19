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

const getMessages=async(req,res,next)=>{
    try{
        const id=req.user.dataValues.id;
    const messages=await Message.findAll()
    console.log('Messages',messages)
    //.then((messages)=>{
        if(messages){
            return res.status(201).json({messages:messages});
        }
    }
    catch(err){
        return res.status(500).json({message:err});
    }
}
module.exports={
    addMessage,
    getMessages
}