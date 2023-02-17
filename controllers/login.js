const User=require('../models/user');
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

const addUser = (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const password = req.body.password;
    if(name==undefined||name.length===0||email==null||email.length===0||password==null||password.length===0){
      return res.status(400).json({err:'Something is missing'});
    }
    const saltRounds=10;
    bcrypt.hash(password,saltRounds,(err,hash)=>{
      console.log(name,email,password);
      const response= User.create({
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        password:hash
     })
     .then((response)=>{
        return res.status(201).json({message:"Successfully Signed Up"});
     })
  .catch((err)=> {
     return res.status(500).json({err:"User Already Exists"});
  })
 })
} 

module.exports={
    addUser
}