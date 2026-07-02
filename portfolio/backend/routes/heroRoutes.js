const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadHeroImage } = require('../middleware/uploadMiddleware');

router.get('/', m.getHero);
router.put('/', authMiddleware, uploadHeroImage.fields([{ name: 'bg_image', maxCount: 1 }, { name: 'avatar', maxCount: 1 }]), m.updateHero);
module.exports = router;
