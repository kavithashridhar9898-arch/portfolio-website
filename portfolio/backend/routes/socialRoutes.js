const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', m.getAllSocial);
router.post('/', authMiddleware, m.createSocial);
router.put('/:id', authMiddleware, m.updateSocial);
router.delete('/:id', authMiddleware, m.deleteSocial);
module.exports = router;
