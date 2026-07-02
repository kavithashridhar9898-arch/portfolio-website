const express = require('express');
const router = express.Router();
const { getAllProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { uploadProjectImage } = require('../middleware/uploadMiddleware');

// Conditional upload middleware: bypasses multer if request content-type is application/json
const safeUpload = (req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    return next();
  }
  uploadProjectImage.single('image')(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

router.get('/', getAllProjects);
router.get('/:slug', getProject);
router.post('/', authMiddleware, safeUpload, createProject);
router.put('/:id', authMiddleware, safeUpload, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
