const express = require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth');

const messageController = require('../controllers/message');

router.get('/getUsers',messageController.getUsers);
router.post('/addMessages',userAuthentication.authenticate,messageController.addMessage);
router.get('/getMessages',userAuthentication.authenticate,messageController.getMessages);
router.post('/addGroupChat',userAuthentication.authenticate,messageController.postGroupChat);
module.exports=router;