const express = require('express');

const router = express.Router();

const userController = require('../controllers/signupLogin');

router.post('/user/signup',userController.addUser);
router.post('/user/login',userController.loginUser);

module.exports = router; 