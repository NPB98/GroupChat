const express = require('express');

const router = express.Router();

const userController = require('../controllers/signupLogin');
const messageController = require('../controllers/message');

router.post('/user/signup',userController.addUser);
router.post('/user/login',userController.loginUser);
router.get('/getUsers',messageController.getUsers);

module.exports = router; 