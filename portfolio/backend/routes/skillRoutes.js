const express = require('express');
const router = express.Router();
const c = require('../controllers/contentController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', c.getAllSkills);
router.post('/', authMiddleware, c.createSkill);
router.put('/:id', authMiddleware, c.updateSkill);
router.delete('/:id', authMiddleware, c.deleteSkill);
module.exports = router;
