  // src/app.js
  const express = require('express');
  const db = require('./config/db');  // <-- 🔗 here app.js connects to MySQL via db.js

  const app = express();
  app.use(express.json());

  // Example route: fetch all users from MySQL
  app.get('/users', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM Users');  // <-- SQL query here
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
  });
