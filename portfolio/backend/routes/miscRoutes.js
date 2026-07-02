const express = require('express');
const router = express.Router();
const m = require('../controllers/miscController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadImage, uploadGallery, uploadCertificate, uploadHeroImage, uploadResume: uploadResumeMW } = require('../middleware/uploadMiddleware');

// Contact (public)
router.post('/contact', m.submitContact);

// Messages (admin)
router.get('/messages', authMiddleware, m.getAllMessages);
router.patch('/messages/:id/read', authMiddleware, m.markRead);
router.delete('/messages/:id', authMiddleware, m.deleteMessage);

// Hero
router.get('/hero', m.getHero);
router.put('/hero', authMiddleware, uploadHeroImage.fields([{ name: 'bg_image', maxCount: 1 }, { name: 'avatar', maxCount: 1 }]), m.updateHero);

// About
router.get('/about', m.getAbout);
router.put('/about', authMiddleware, uploadImage.single('card2_image'), m.updateAbout);

// SEO
router.get('/seo', m.getSEO);
router.put('/seo', authMiddleware, m.updateSEO);

// Analytics
router.post('/analytics/track', m.trackPageView);
router.get('/analytics', authMiddleware, m.getAnalytics);

// Settings
router.get('/settings', m.getSettings);
router.put('/settings', authMiddleware, m.updateSettings);

// Social
router.get('/social', m.getAllSocial);
router.post('/social', authMiddleware, m.createSocial);
router.put('/social/:id', authMiddleware, m.updateSocial);
router.delete('/social/:id', authMiddleware, m.deleteSocial);

// Resume
router.get('/resume', m.getResume);
router.post('/resume', authMiddleware, uploadResumeMW.single('resume'), m.uploadResume);

// Gallery
router.get('/gallery', m.getAllGallery);
router.post('/gallery', authMiddleware, uploadGallery.single('image'), m.addGalleryImage);
router.delete('/gallery/:id', authMiddleware, m.deleteGalleryImage);

// Achievements
router.get('/achievements', m.getAllAchievements);
router.post('/achievements', authMiddleware, m.createAchievement);
router.put('/achievements/:id', authMiddleware, m.updateAchievement);
router.delete('/achievements/:id', authMiddleware, m.deleteAchievement);

// Certificates
router.get('/certificates', m.getAllCertificates);
router.post('/certificates', authMiddleware, uploadCertificate.single('image'), m.createCertificate);
router.put('/certificates/:id', authMiddleware, uploadCertificate.single('image'), m.updateCertificate);
router.delete('/certificates/:id', authMiddleware, m.deleteCertificate);

module.exports = router;
