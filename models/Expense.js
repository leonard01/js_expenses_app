// models/Expense.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  expense_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Define the relationship: Each expense belongs to a user.
Expense.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Expense, { foreignKey: 'user_id' });

module.exports = Expense;
