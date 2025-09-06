const express = require('express');
const { createUser } = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser); // POST /users

module.exports = router;
