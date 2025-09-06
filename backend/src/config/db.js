// src/config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lakshmi@2005',
  database: 'campusdeals'
});

module.exports = pool;
