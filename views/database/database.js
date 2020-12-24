const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas', 'root', '@JORGE1989',{
    host: 'localhost:3306',
    dialect: 'mysql'
});
module.exports = connection;