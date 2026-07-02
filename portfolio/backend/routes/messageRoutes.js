const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, m.getAllMessages);
router.patch('/:id/read', authMiddleware, m.markRead);
router.delete('/:id', authMiddleware, m.deleteMessage);
module.exports = router;
