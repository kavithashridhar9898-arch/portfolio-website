const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', m.getSettings);
router.put('/', authMiddleware, m.updateSettings);
module.exports = router;
