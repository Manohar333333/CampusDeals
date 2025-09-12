const { verifyToken } = require('../utils/auth');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: '❌ Access token required' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Add user info to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: '❌ Invalid or expired token' });
  }
};

// Middleware to check user roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: '❌ User not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `❌ Access denied. Required roles: ${roles.join(', ')}` 
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles
};
