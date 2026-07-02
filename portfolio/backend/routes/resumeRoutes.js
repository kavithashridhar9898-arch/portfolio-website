const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadResume: uploadResumeMW } = require('../middleware/uploadMiddleware');

router.get('/', m.getResume);
router.post('/', authMiddleware, uploadResumeMW.single('resume'), m.uploadResume);
module.exports = router;
