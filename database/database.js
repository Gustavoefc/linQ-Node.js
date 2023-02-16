const Sequelize = require('sequelize');

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite'
});

module.exports = connection