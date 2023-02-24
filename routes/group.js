const express = require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth');

const groupController = require('../controllers/group');
router.get('/getUser',groupController.getUser);
router.post('/createGroup',userAuthentication.authenticate,groupController.createGroup);

router.get('/getGroups',userAuthentication.authenticate,groupController.getGroup);

router.get('/getAllMessages',userAuthentication.authenticate,groupController.getMessages);

router.post('/joinGroup',userAuthentication.authenticate,groupController.joinGroup);

router.get('/getAllGroups',userAuthentication.authenticate,groupController.getAllGroups);

router.get('/isAdmin',userAuthentication.authenticate,groupController.isAdmin);

router.post('/addUser',userAuthentication.authenticate,groupController.addUserToGroup);

router.post('/makeAdmin',userAuthentication.authenticate,groupController.makeAdmin);

router.post('/deleteUser',userAuthentication.authenticate,groupController.deleteUser);

module.exports = router;