const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const cors = require('cors');
const User = require('./models/user');
const userRoute = require('./routes/login');
app.use(cors());

app.use(bodyParser.json());


app.use('/',userRoute);
sequelize.sync()
.then(result =>app.listen(4000))
.catch(err => console.log(err));