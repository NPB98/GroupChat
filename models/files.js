const Sequelize = require('sequelize');
const sequelize = require('../util/database'); 

const Files = sequelize.define('files',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    files:Sequelize.STRING
});

module.exports = Files;