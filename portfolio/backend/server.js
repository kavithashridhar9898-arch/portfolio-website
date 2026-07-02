require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { createRateLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const educationRoutes = require('./routes/educationRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const messageRoutes = require('./routes/messageRoutes');
const heroRoutes = require('./routes/heroRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const socialRoutes = require('./routes/socialRoutes');
const seoRoutes = require('./routes/seoRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ──────────────────────────────────────────────────────────
// Security Middleware
// ──────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ──────────────────────────────────────────────────────────
// Body Parsing
// ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ──────────────────────────────────────────────────────────
// Logging
// ──────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// ──────────────────────────────────────────────────────────
// Rate Limiting
// ──────────────────────────────────────────────────────────
app.use('/api/', createRateLimiter(100, 15)); // 100 requests per 15 minutes
app.use('/api/auth/', createRateLimiter(10, 15)); // Stricter for auth endpoints
app.use('/api/contact', createRateLimiter(5, 60)); // 5 contact forms per hour

// ──────────────────────────────────────────────────────────
// Static Files (Uploads)
// ──────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ──────────────────────────────────────────────────────────
// Health Check
// ──────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ──────────────────────────────────────────────────────────
// API Routes
// ──────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/analytics', analyticsRoutes);

// ──────────────────────────────────────────────────────────
// 404 Handler
// ──────────────────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ──────────────────────────────────────────────────────────
// Global Error Handler
// ──────────────────────────────────────────────────────────
app.use(errorHandler);

// ──────────────────────────────────────────────────────────
// Start Server
// ──────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Aether.OS API running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health: http://localhost:${PORT}/health\n`);
  });
}

module.exports = app;
