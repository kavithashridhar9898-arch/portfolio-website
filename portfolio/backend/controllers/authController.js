const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query, queryOne } = require('../database/connection');

/**
 * Generate JWT token pair (access + refresh concept via expires).
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// ──────────────────────────────────────────────────────────
// POST /api/auth/login
// ──────────────────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await queryOne('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar_url: user.avatar_url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────
// GET /api/auth/me
// ──────────────────────────────────────────────────────────
const getMe = async (req, res, next) => {
  try {
    const user = await queryOne(
      'SELECT id, name, email, role, avatar_url, bio, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────
// PUT /api/auth/change-password
// ──────────────────────────────────────────────────────────
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both passwords are required.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters.' });
    }

    const user = await queryOne('SELECT * FROM users WHERE id = ?', [req.user.id]);
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    await query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, req.user.id]);

    res.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────
// PUT /api/auth/profile
// ──────────────────────────────────────────────────────────
const updateProfile = async (req, res, next) => {
  try {
    const { name, bio } = req.body;
    let avatar_url = req.body.avatar_url;

    // If file was uploaded, use file URL
    if (req.file) {
      avatar_url = `/uploads/images/${req.file.filename}`;
    }

    await query(
      'UPDATE users SET name = ?, bio = ?, avatar_url = ? WHERE id = ?',
      [name, bio, avatar_url, req.user.id]
    );

    const updated = await queryOne(
      'SELECT id, name, email, role, avatar_url, bio FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe, changePassword, updateProfile };
