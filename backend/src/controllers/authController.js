const db = require('../config/db');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');

// User Registration
const register = async (req, res) => {
  try {
    const {
      user_name,
      user_email,
      user_password,
      role = 'buyer',
      user_phone,
      user_studyyear,
      user_branch,
      user_section,
      user_residency,
      payment_received = 0,
      amount_given = 0
    } = req.body;

    // Validation
    if (!user_name || !user_email || !user_password) {
      return res.status(400).json({ 
        message: '❌ Name, email, and password are required' 
      });
    }

    // Check if user already exists
    const [existingUser] = await db.query(
      'SELECT user_id FROM Users WHERE user_email = ?',
      [user_email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ 
        message: '❌ User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(user_password);

    // Insert new user
    const [result] = await db.query(
      `INSERT INTO Users 
       (user_name, user_email, user_password, role, user_phone, user_studyyear, user_branch, user_section, user_residency, payment_received, amount_given) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_name,
        user_email,
        hashedPassword,
        role,
        user_phone,
        user_studyyear,
        user_branch,
        user_section,
        user_residency,
        payment_received,
        amount_given
      ]
    );

    // Generate JWT token
    const token = generateToken(result.insertId, user_email, role);

    res.status(201).json({
      message: '✅ User registered successfully',
      token,
      user: {
        userId: result.insertId,
        name: user_name,
        email: user_email,
        role: role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: '❌ Internal server error' });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    // Validation
    if (!user_email || !user_password) {
      return res.status(400).json({ 
        message: '❌ Email and password are required' 
      });
    }

    // Find user by email
    const [users] = await db.query(
      'SELECT user_id, user_name, user_email, user_password, role FROM Users WHERE user_email = ?',
      [user_email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        message: '❌ Invalid email or password' 
      });
    }

    const user = users[0];

    // Compare password
    const isPasswordValid = await comparePassword(user_password, user.user_password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: '❌ Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = generateToken(user.user_id, user.user_email, user.role);

    res.json({
      message: '✅ Login successful',
      token,
      user: {
        userId: user.user_id,
        name: user.user_name,
        email: user.user_email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: '❌ Internal server error' });
  }
};

// Get current user profile (protected route)
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [users] = await db.query(
      `SELECT user_id, user_name, user_email, role, user_phone, user_studyyear, 
       user_branch, user_section, user_residency, payment_received, amount_given 
       FROM Users WHERE user_id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: '❌ User not found' });
    }

    res.json({
      message: '✅ Profile retrieved successfully',
      user: users[0]
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: '❌ Internal server error' });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
