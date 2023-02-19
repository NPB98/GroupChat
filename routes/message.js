const express = require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth');

const messageController = require('../controllers/message');

router.post('/addMessages',userAuthentication.authenticate,messageController.addMessage);
router.get('/getMessages',userAuthentication.authenticate,messageController.getMessages);
module.exports=router;