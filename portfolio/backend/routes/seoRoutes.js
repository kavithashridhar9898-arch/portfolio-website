const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', m.getSEO);
router.put('/', authMiddleware, m.updateSEO);
module.exports = router;
