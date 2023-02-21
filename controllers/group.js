const Group = require('../models/totalGroups');
const UserGroup = require('../models/groupDetails');
const Message = require('../models/message');

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
        console.log(groupId);       
       const messages = await Message.findAll({where:{GroupId:groupId}});
        res.status(200).json(messages);
    }
    catch(error){
        res.status(500).json({error});
    }
};

exports.joinGroup = async(req,res)=>{
    try{    
        console.log('ASDERFGTTY',req);  
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