/**
 * Central error handler middleware.
 * Catches all errors passed via next(err) and returns a clean JSON response.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // MySQL duplicate entry error
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'A record with this value already exists.';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your session has expired. Please log in again.';
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413;
    message = 'File is too large. Maximum size is 10MB.';
  }

  // Validation errors (from express-validator)
  if (err.type === 'ValidationError') {
    statusCode = 422;
    message = err.message;
  }

  console.error(`[ERROR] ${req.method} ${req.originalUrl} — ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
