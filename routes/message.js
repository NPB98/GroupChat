const express = require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth');

const messageController = require('../controllers/message');

router.post('/messages',userAuthentication.authenticate,messageController.addMessage);

module.exports=router;