const express = require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth');

const groupController = require('../controllers/group');

router.post('/createGroup',userAuthentication.authenticate,groupController.createGroup);

router.get('/getGroups',userAuthentication.authenticate,groupController.getGroup);

router.get('/getAllMessages',userAuthentication.authenticate,groupController.getMessages);

router.post('/joinGroup',userAuthentication.authenticate,groupController.joinGroup);

router.get('/getAllGroups',userAuthentication.authenticate,groupController.getAllGroups);

module.exports = router;