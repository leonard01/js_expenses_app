// startApp.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const { Client } = require('pg');
const sequelize = require('./database');
const User = require('./models/User');
const Expense = require('./models/Expense');

const PORT = process.env.PORT || 3000;

async function createDatabaseIfNotExists() {
  const dbName = process.env.TARGET_DB;
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  
  try {
    await client.connect();
    const { rowCount } = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (rowCount === 0) {
      console.log(`Database "${dbName}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database "${dbName}" created.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());
  
  // Serve static files from the public folder
  app.use(express.static(path.join(__dirname, 'public')));

  // Route to create a new user
  app.post('/users', async (req, res) => {
    console.log('POST /users was hit with data:', req.body);
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to insert a new expense
  app.post('/expenses', async (req, res) => {
    try {
      const expense = await Expense.create(req.body);
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // (Optional) Route to retrieve expenses for a given user
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

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

async function startApplication() {
  await createDatabaseIfNotExists();

  try {
    await sequelize.authenticate();
    console.log('Connected to the target database successfully.');
    await sequelize.sync({ force: false });
    console.log('Schema synchronized: Tables are created/updated!');
  } catch (error) {
    console.error('Error during Sequelize sync:', error);
    process.exit(1);
  }

  startServer();
}

startApplication();
