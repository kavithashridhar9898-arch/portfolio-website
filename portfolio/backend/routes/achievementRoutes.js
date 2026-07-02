const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', m.getAllAchievements);
router.post('/', authMiddleware, m.createAchievement);
router.put('/:id', authMiddleware, m.updateAchievement);
router.delete('/:id', authMiddleware, m.deleteAchievement);
module.exports = router;
