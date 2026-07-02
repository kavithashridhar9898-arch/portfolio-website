const express = require('express');
const router = express.Router();
const { login, getMe, changePassword, updateProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadImage } = require('../middleware/uploadMiddleware');

router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.put('/change-password', authMiddleware, changePassword);
router.put('/profile', authMiddleware, uploadImage.single('avatar'), updateProfile);

module.exports = router;
