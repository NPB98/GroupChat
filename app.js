const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const cors = require('cors');

const User = require('./models/user');
const Message=require('./models/message');

const userRoute = require('./routes/signupLogin');
const messageRoute=require('./routes/message');

app.use(cors());
app.use(bodyParser.json());

app.use('/',userRoute);
app.use('/',messageRoute);

User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync()
.then(result =>app.listen(4000))
.catch(err => console.log(err));