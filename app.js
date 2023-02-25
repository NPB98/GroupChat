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
const File = require('./models/files.js');
const GroupFiles = require('./models/groupFiles');
const UserFiles = require('./models/userFiles')

const userRoute = require('./routes/signupLogin');
const messageRoute=require('./routes/message');
const groupRoute=require('./routes/group');
const fileRoute = require('./routes/file');

app.use(cors({
    origin:"*",
}));
app.use(bodyParser.json());

app.use('/',userRoute);
app.use('/',messageRoute);
app.use('/',groupRoute);
app.use('/',fileRoute);

User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

User.belongsToMany(Group,{ through: GroupDetails });
Group.belongsToMany(User,{ through: GroupDetails });

User.belongsToMany(File,{ through: UserFiles });
File.belongsToMany(User,{ through: UserFiles });

Group.belongsToMany(File,{ through: GroupFiles });
File.belongsToMany(Group,{ through: GroupFiles });


sequelize.sync()
.then(result =>app.listen(4000))
.catch(err => console.log(err));