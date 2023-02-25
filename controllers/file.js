const AWS = require('aws-sdk');
const multer = require('multer');
const User = require('../models/user');
const File = require('../models/files');
const userFile = require('../models/userFiles');
const groupFile = require('../models/groupFiles');
const Groups = require('../models/totalGroups');

let S3;
exports.uploadFile = async (req,res,next)=>{
    //console.log('PERSONAL FILE',req.body.file.split('.'));
     // console.log(req.image);
     const awsConfig = {
         accessKeyId:process.env.IAM_USER_KEY,
         secretAccessKey:process.env.IAM_USER_SECRET,
         //region:process.env.REGION
     }
          S3 = new AWS.S3(awsConfig);
    if(req.body.file){
     const result = await uploadToS3(req.body.file,req.body.file.split('.')[1]);
     //console.log('RESULT',result);
     const file = await File.create({
         files:result
     })
     //console.log('FILE ID',file.id);
     await userFile.create({ 
         userId:req.user.id,
         fileId: file.id
     })
     return res.json({
             message: "uploaded successfully",
             imageUrl: result.Location
     })
    }
 } 
 
 const uploadToS3 = (fileData,type)=>{
     return new Promise((resolve,reject)=>{
         let params;
         console.log('mimetype',type);
        if(type === 'jpeg' ||type === 'png' || type === 'jpg' ){
              params = {
                 Bucket :process.env.BUCKET_NAME,
                 Key:`${Date.now().toString()}.jpg`,
                 Body:fileData,
                 ACL: 'public-read'
             }
         }
         
         else if(type === 'pdf'){
             params = {
                 Bucket :process.env.BUCKET_NAME,
                 Key:`${Date.now().toString()}.pdf`,
                 Body:fileData,
                 ACL: 'public-read'
             }
         }
         else{
              params = {
                 Bucket :process.env.BUCKET_NAME,
                 Key:`${Date.now().toString()}.mp4`,
                 Body:fileData,
                 ACL: 'public-read'
             }
            }
         S3.upload(params,(err,data)=>{
             if(err){
                 console.log(err)
                 return reject(err)
             }
             console.log(data)
             return resolve(data.Location)
         })
     })
 }

 exports.getFiles = async(req,res,next)=>{ 
    try{
        //console.log('TO IDENTIFY USERID',req)
        const files = await userFile.findAll();
        res.status(200).json(files);
    }
    catch(error){
         res.status(404).json(error);
    }
};

exports.uploadGroupFile = async(req,res,next)=>{ 
    //console.log('GROUP FILES',req.body.groupfile);   
    const awsConfig = {
        accessKeyId:process.env.IAM_USER_KEY,
        secretAccessKey:process.env.IAM_USER_SECRET,
        //region:process.env.REGION    
    }    
         S3 = new AWS.S3(awsConfig);
         if(req.body.groupfile){        
            //console.log('asfgciwegliw',req);
            const result = await uploadToS3(req.body.groupfile,req.body.groupfile.split('.')[1]);
            //console.log('image rsult',result);
            const file = await File.create({
        files:result
    })
    await groupFile.create({       
        groupId:req.query.id,
        fileId: file.id
    })
    return res.json({
            message: "uploaded successfully",
            imageUrl: result.Location
    })
   }
};

exports.getAllFiles = async(req,res,next)=>{
    try{      
        const id = req.query.groupId;
        //const group = await Groups.findByPk(id);
        //console.log(group);
       const groupFiles = await groupFile.findAll({where:{groupId:req.query.groupId}});
       //console.log('GROUP FILES',groupFiles);
       const fileNames=[];
       //console.log('GROUP FILES',groupFiles[0]);
       for(let i=0;i<groupFiles.length;i++){
        fileNames.push(await File.findByPk(groupFiles[i].dataValues.fileId));
       }
        res.status(201).json(fileNames);
    }
    catch(error){
        console.log(error);
        res.status(404).json(error);
    }
}

exports.getFileNames=async(req,res,next)=>{
    //console.log('GET FILE NAMES',req);
    const fileNames=await File.findAll({where:{id:req.query.fileId}})
    console.log('GET FILE NAMES',fileNames);
    res.status(201).json(fileNames);
}