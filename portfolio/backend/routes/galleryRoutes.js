const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadGallery } = require('../middleware/uploadMiddleware');

router.get('/', m.getAllGallery);
router.post('/', authMiddleware, uploadGallery.single('image'), m.addGalleryImage);
router.delete('/:id', authMiddleware, m.deleteGalleryImage);
module.exports = router;
