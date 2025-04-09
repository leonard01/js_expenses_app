// database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL_FOR_DB,
  {
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
