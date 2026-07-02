const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadCertificate } = require('../middleware/uploadMiddleware');

router.get('/', m.getAllCertificates);
router.post('/', authMiddleware, uploadCertificate.single('image'), m.createCertificate);
router.put('/:id', authMiddleware, uploadCertificate.single('image'), m.updateCertificate);
router.delete('/:id', authMiddleware, m.deleteCertificate);
module.exports = router;
