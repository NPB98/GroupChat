const Group = require('../models/totalGroups');
const UserGroup = require('../models/groupDetails');
const Message = require('../models/message');
const User=require('../models/user');

exports.getUser=async(req,res,next)=>{
    try{
        //console.log('PARAMS',req.query);
        const users=await User.findByPk(req.query.userId);
        console.log('USERS',users);
        res.status(200).json(users);
    }
    catch(err){
        console.log(err);
    }
}

exports.createGroup = async(req,res)=>{
    try{
        console.log('Request',req);
        const groupName = req.body.group;
        console.log(groupName);
    const group =  await Group.create({
            groupName:groupName
        })
        //console.log('qwesrrrrrrrrrrry',group);
        //console.log('qwesrrrrrrrrrrry',req.user.dataValues.id);
        //console.log('GroupId',group.id)
        const usergroup =  await UserGroup.create({
            userId:req.user.dataValues.id,
            groupId:group.id
        })
        const usergroup2 = await UserGroup.update(
            {
                isAdmin:true,
            },
            {
                where:{
                    userId:req.user.dataValues.id,
                    groupId:group.id
                }
            }
        );
        //console.log('asssssssssdagg',usergroup);
        res.status(201).json({message:"successfully created group",group,usergroup});
    }
    catch(error){
        res.status(500).json({error});
    };
   
};

exports.getGroup = async(req,res)=>{
    try{
        console.log(req);
       const response =  await Group.findAll();
       //console.log(response);
       return res.status(200).json(response);
    }
    catch(error){
        return res.status(500).json({err:error});
    }
};

exports.getMessages = async(req,res)=>{
    try{     
        const groupId = req.query.groupId;
        //console.log('USER Id',req.user.dataValues.id);
        //console.log(groupId);       
       const messages = await Message.findAll({where:
        {groupId:groupId}
    });
        res.status(200).json(messages);
    }
    catch(error){
        res.status(500).json({error});
    }
};

exports.joinGroup = async(req,res)=>{
    try{    
        //console.log('ASDERFGTTY',req);  
        const id = req.body.id;
       const group =  await UserGroup.create({
            userId:req.user.id,
            groupId:id
        })
        res.status(201).json(group);
    }
    catch(error){
     res.status(500).json(error);
    }
};

exports.getAllGroups = async(req,res)=>{
    try{      
        const groups = await Group.findAll();
        res.status(200).json(groups);
    }
    catch(error){
        res.status(500).json(error);
    }
}

exports.isAdmin = async(req,res,next)=>{
    try{    
        //console.log('REQUESTSSSSSSS',req)
        console.log(req.user.id);
    const usergroup = await UserGroup.findAll({
            where:{
                userId:req.user.id,
                isAdmin:'true'
            }
        })
        console.log(usergroup);
        res.status(200).json(usergroup);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

exports.addUserToGroup = async(req,res,next)=>{   
    try{
        const groupId = req.body.groupId;
        const userId = req.body.userId;
        console.log(groupId,userId);
        const usergroup = await UserGroup.create({         
            userId:userId,
            groupId:groupId,
        });
        res.status(201).json({message:"Successfully added User to Group"},usergroup);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

exports.makeAdmin = async(req,res)=>{   
    try{      
        const groupId = req.body.groupId;
        const userId = req.body.userId;
        const usergroup = await UserGroup.update(
            {
                isAdmin:true,
            },
            {
                where:{
                    userId:userId,
                    groupId:groupId
                }
            }
        );
        res.status(201).json({usergroup,message:"Successfully updated admin in the group"})
    }
    catch(error){
        console.log(error);
       res.status(500).json(error);
    }
};

exports.deleteUser = async(req,res)=>{ 
    try{
        const groupId = req.body.groupId;
        const userId = req.body.userId;       
        const usergroup = await UserGroup.destroy({
            where:{
                userId:userId,
                groupId:groupId
            }
        });     
        res.status(201).json({usergroup, message:"Successfully deleted user from group"});
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};
