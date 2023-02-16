const Sequelize = require('sequelize')
const connection = require('../database/database');

const Link = connection.define('links', {
  label: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Link.sync({ force: false })

module.exports = Link;