const express = require('express');
const router = express.Router();
const c = require('../controllers/contentController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', c.getAllExperience);
router.post('/', authMiddleware, c.createExperience);
router.put('/:id', authMiddleware, c.updateExperience);
router.delete('/:id', authMiddleware, c.deleteExperience);
module.exports = router;
