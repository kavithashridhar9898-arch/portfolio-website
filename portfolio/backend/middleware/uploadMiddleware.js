const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Ensure upload directories exist
const uploadsDir = process.env.UPLOAD_PATH || './uploads';
const dirs = ['images', 'gallery', 'certificates', 'resume', 'projects', 'hero'];
dirs.forEach(dir => {
  const dirPath = path.join(uploadsDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

/**
 * Create multer disk storage with sub-directory routing.
 */
const createStorage = (subDir) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(uploadsDir, subDir));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

const imageFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WebP, GIF) are allowed.'));
  }
};

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed for resume.'));
  }
};

const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760'); // 10MB

// Image upload (general)
const uploadImage = multer({
  storage: createStorage('images'),
  fileFilter: imageFilter,
  limits: { fileSize: MAX_SIZE },
});

// Gallery upload
const uploadGallery = multer({
  storage: createStorage('gallery'),
  fileFilter: imageFilter,
  limits: { fileSize: MAX_SIZE },
});

// Project image upload
const uploadProjectImage = multer({
  storage: createStorage('projects'),
  fileFilter: imageFilter,
  limits: { fileSize: MAX_SIZE },
});

// Certificate image upload
const uploadCertificate = multer({
  storage: createStorage('certificates'),
  fileFilter: imageFilter,
  limits: { fileSize: MAX_SIZE },
});

// Hero image upload
const uploadHeroImage = multer({
  storage: createStorage('hero'),
  fileFilter: imageFilter,
  limits: { fileSize: MAX_SIZE },
});

// Resume PDF upload
const uploadResume = multer({
  storage: createStorage('resume'),
  fileFilter: pdfFilter,
  limits: { fileSize: MAX_SIZE },
});

module.exports = {
  uploadImage,
  uploadGallery,
  uploadProjectImage,
  uploadCertificate,
  uploadHeroImage,
  uploadResume,
};
