const express = require('express');
const router = express.Router();
const c = require('../controllers/contentController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', c.getAllEducation);
router.post('/', authMiddleware, c.createEducation);
router.put('/:id', authMiddleware, c.updateEducation);
router.delete('/:id', authMiddleware, c.deleteEducation);
module.exports = router;
