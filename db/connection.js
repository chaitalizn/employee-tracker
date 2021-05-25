
//this is to connect mysql2
const mysql = require('mysql2');
require('dotenv').config();
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: process.env.DB_PW,
      database: 'employee'
    },
    console.log('Connected to the employee database.')
  );

  module.exports = db;