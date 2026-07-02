const jwt = require('jsonwebtoken');
const { queryOne } = require('../database/connection');

/**
 * Verify JWT token and attach user to request.
 * Used to protect admin-only routes.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token;

    // Support both Bearer token and httpOnly cookie
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists in DB
    const user = await queryOne(
      'SELECT id, name, email, role FROM users WHERE id = ?',
      [decoded.id]
    );

    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists.' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Restrict access to specific roles.
 * @param {...string} roles - Allowed roles (e.g., 'admin', 'editor')
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      });
    }
    next();
  };
};

module.exports = { authMiddleware, restrictTo };
