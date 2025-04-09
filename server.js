// server.js
const express = require('express');
const sequelize = require('./database');
const path = require('path');  // <-- Add this line!
const User = require('./models/User');
const Expense = require('./models/Expense');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Place index.html in a folder named public


// Example route to fetch expenses by user ID
app.get('/expenses/:userId', async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { user_id: req.params.userId },
      order: [['expense_date', 'DESC']],
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example route to create an expense
app.post('/expenses', async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server after ensuring schema is in place.
const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await sequelize.sync(); // This makes sure tables exist
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

