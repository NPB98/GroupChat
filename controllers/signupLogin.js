const User=require('../models/user');
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

const addUser =async(req,res,next)=>{
   try{
      const name = req.body.name;
      const email = req.body.email;
      const phoneNumber=req.body.phoneNumber;
      const password = req.body.password;
      if(name==undefined||name.length===0||email==null||email.length===0||password==null||password.length===0){
         return res.status(400).json({err:'Something is missing'});
      }
      const saltRounds=10;
      bcrypt.hash(password,saltRounds,async(err,hash)=>{
      //console.log(name,email,password);
      const response=await User.create({
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        password:hash,
        isActive:'false'
     })
     //.then((response)=>{
      if(response){
         return res.status(201).json({message:"Successfully Signed Up"});
      }
      else{
        //.catch((err)=>{
         return res.status(500).json({err:"User Already Exists"});
         }
      })
   }
   catch(err){
      return res.status(404).json({err:"Something Went Wrong"});
   }
}

function generateAccessToken(id,name){
   return jwt.sign({userId:id,name:name},process.env.TOKEN_SECRET);
 }

const loginUser=async(req,res,next)=>{
   try{
   const email=req.body.email;
   const password=req.body.password;
   //console.log(email);
   const user=await User.findAll({where:{email:email}})
   console.log(user);
     if(user.length>0){
       bcrypt.compare(password,user[0].password,(err,response)=>{
         if(err){
           return res.status(500).json({success:false,message:"Something went wrong"});
         }
         if(response===true){
          //User.update({
            //isActive:true,
            //},{where:{id:user[0].dataValues.id}})
          //.then((response)=>{
            return res.status(200).json({success:true, message:"User logged in successfully",token:generateAccessToken(user[0].id,user[0].name)});
          //})
          } 
         else{
           return res.status(401).json({success:false,message:"User not authorized"});
         }
       })
     }
     else{
       return res.status(404).json({success:false,message:"User not found"});
     }
   }
   catch(err){
     return res.status(500).json({success:false,message:err});
   }
  }

module.exports={
    addUser,
    loginUser
}