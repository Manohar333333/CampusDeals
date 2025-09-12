const express = require('express');
const { createUser } = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const db = require('../config/db');
const router = express.Router();

// Admin only routes
router.get('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT user_id, user_name, user_email, role, user_phone, user_studyyear, user_branch, user_section, user_residency, payment_received, amount_given FROM Users'
    );
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: '❌ Error fetching users' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;
    
    // Users can only update their own profile, admins can update any profile
    if (userRole !== 'admin' && parseInt(id) !== userId) {
      return res.status(403).json({ message: '❌ Access denied' });
    }

    const { user_phone, user_studyyear, user_branch, user_section, user_residency } = req.body;
    
    const [result] = await db.query(
      'UPDATE Users SET user_phone=?, user_studyyear=?, user_branch=?, user_section=?, user_residency=? WHERE user_id=?',
      [user_phone, user_studyyear, user_branch, user_section, user_residency, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '❌ User not found' });
    }

    res.json({ message: '✅ User Updated!' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: '❌ Error updating user' });
  }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.query('DELETE FROM Users WHERE user_id=?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '❌ User not found' });
    }

    res.json({ message: '🗑 User Deleted!' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: '❌ Error deleting user' });
  }
});

module.exports = router;
