const express = require('express');
const router = express.Router();
const { getAllProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadProjectImage } = require('../middleware/uploadMiddleware');

router.get('/', getAllProjects);
router.get('/:slug', getProject);
router.post('/', authMiddleware, uploadProjectImage.single('image'), createProject);
router.put('/:id', authMiddleware, uploadProjectImage.single('image'), updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
