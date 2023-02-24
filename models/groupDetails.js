const Sequelize = require('sequelize');

const sequelize = require('../util/database'); 

const usersInGroup = sequelize.define('groupDetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    isAdmin:Sequelize.STRING
});

module.exports = usersInGroup;
