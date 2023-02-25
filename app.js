const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const cors = require('cors');

const User = require('./models/user');
const Message=require('./models/message');
const Group=require('./models/totalGroups');
const GroupDetails=require('./models/groupDetails');

const userRoute = require('./routes/signupLogin');
const messageRoute=require('./routes/message');
const groupRoute=require('./routes/group');

app.use(cors());
app.use(bodyParser.json());

app.use('/',userRoute);
app.use('/',messageRoute);
app.use('/',groupRoute);

User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

User.belongsToMany(Group,{ through: GroupDetails });
Group.belongsToMany(User,{ through: GroupDetails });


sequelize.sync()
.then(result =>app.listen(4000))
.catch(err => console.log(err));