const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas', 'root', '@JORGE1989',{
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = connection;