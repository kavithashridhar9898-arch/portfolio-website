const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', m.submitContact);
module.exports = router;
