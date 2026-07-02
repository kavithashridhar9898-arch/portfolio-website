const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/track', m.trackPageView);
router.get('/', authMiddleware, m.getAnalytics);
module.exports = router;
