const express = require('express');
const { signup, login, getProfile, validateUserForTransaction, register } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes for authentication
router.post('/signup', signup);
router.post('/register', register); // Backward compatibility
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.post('/validate-transaction', authenticateToken, validateUserForTransaction);

module.exports = router;
