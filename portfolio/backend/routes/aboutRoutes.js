// Re-export from miscRoutes for modular structure
const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadImage } = require('../middleware/uploadMiddleware');

router.get('/', m.getAbout);
router.put('/', authMiddleware, uploadImage.single('card2_image'), m.updateAbout);
module.exports = router;
