const rateLimit = require('express-rate-limit');

/**
 * Create a rate limiter middleware.
 * @param {number} maxRequests - Max requests per window
 * @param {number} windowMinutes - Window in minutes
 */
const createRateLimiter = (maxRequests = 100, windowMinutes = 15) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: `Too many requests. Please try again after ${windowMinutes} minutes.`,
    },
    skip: (req) => req.ip === '127.0.0.1' || req.ip === '::1', // Skip localhost in dev
  });
};

module.exports = { createRateLimiter };
