const Message=require('../models/message');
const User = require('../models/user');
const sequelize=require('../util/database');
const { Op } = require("sequelize");

const getUsers=async(req,res,next)=>{
    User.findAll()
    .then((resp)=>{
        return res.status(201).json({users:resp});
    })
    .catch((err)=>{
        return res.status(400).json({users:'null'});
    })
}

const addMessage=async (req,res,next)=>{
    try{
        console.log('Message Request',req);
        const message=req.body.message;
        console.log(message);
        const response=await Message.create({
            message:message,
            userId:req.user.id
        })
        //.then((response)=>{
            if(response){
                return res.status(201).json({message:message});
            }
        }
    catch(err){
        return res.status(404).json({message:'Something Went Wrong'});
    }
}

const getMessages=async(req,res,next)=>{
    try{
        const id=req.user.dataValues.id;
        const messages=await Message.findAll( 
    {where:{
       id:{
            [Op.gt]:id
        }
    }
})
    //console.log('Messages',messages)
    //.then((messages)=>{
        if(messages){
            return res.status(201).json({messages:messages});
        }
    }
    catch(err){
        return res.status(500).json({message:err});
    }
}

const postGroupChat = async(req,res,next)=>{
    try{
        const chats = await Message.create({
            message:req.body.message,
            userId:req.user.dataValues.id,
            groupId:req.query.id
        })
        res.status(201).json(chats);
    }
    catch(error){
        res.status(404).json(error);
    }
};
module.exports={
    addMessage,
    getMessages,
    getUsers,
    postGroupChat
}