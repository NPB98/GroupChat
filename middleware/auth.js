const jwt=require('jsonwebtoken');
const User=require('../models/user');

const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        const user=jwt.verify(token,process.env.TOKEN_SECRET);
        //console.log(user.userId);
        User.findByPk(user.userId).then(user=>{
            req.user=user;
            console.log('Authentication',user);
            next();
        }).catch(err=>{
            throw new Error(err);
        })
    }catch(err){
       return res.status(401).json({success:false});
    }
}
module.exports={
    authenticate
}