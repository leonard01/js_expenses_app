require('dotenv').config();
const { Sequelize } = require('sequelize');

// DATABASE_URL_FOR_DB should point to your target database (expense_tracker)
const sequelize = new Sequelize(
  process.env.DATABASE_URL_FOR_DB,
  {
    dialect: 'postgres',
    logging: false, // Change to true to enable SQL logging
  }
);

module.exports = sequelize;
