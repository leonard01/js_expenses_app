# js_expenses_app

A simple Expense Tracker application built with Node.js, Express, Sequelize, and PostgreSQL. This project provides a RESTful API with user creation, expense insertion, expense listing (with filters by user ID or email), and expense deletion. A basic HTML UI is included for testing the functionality.

## Features

- **User Management**
  - Create a new user with unique username and email.
  - Detailed error messages for duplicate username or email.
- **Expense Management**
  - Insert expenses linked to a user.
  - View a user’s expenses by filtering either by user ID or email.
  - Delete individual expenses using a delete button on the UI.
- **Simple Web UI**
  - HTML forms to create users, add expenses, and view (with delete buttons) existing expenses.


### Running the Application

Ensure that PostgreSQL server is running

sudo systemctl start postgresql

Then run the server

npm start

And goto http://localhost:3000 in your browser
