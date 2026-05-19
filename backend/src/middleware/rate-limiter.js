import rateLimit from "express-rate-limit";

const mins = (n) => n * 60 * 1000;
const hours = (n) => n * 60 * 60 * 1000;

const createLimiter = (windowMs, max, message, options = {}) =>
  rateLimit({
    windowMs,
    max,
    message: { message },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    handler: (req, res, next, options) => {
      res.status(options.statusCode).json(options.message);
    },
    ...options,
  });

export const loginLimiter = createLimiter(
  mins(15),
  5,
  "Too many login attempts. Please try again after 15 minutes.",
  {
    skipSuccessfulRequests: true,
  },
);

export const registerLimiter = createLimiter(
  hours(1),
  3,
  "Too many accounts created from this IP. Please try again after 1 hour.",
);

export const globalLimiter = createLimiter(
  mins(15),
  200,
  "Too many requests. Please try again after 15 minutes.",
);

export const submitLimiter = createLimiter(
  mins(1),
  10,
  "You're submitting too fast. Please slow down.",
  {
    keyGenerator: (req) => req.user?.id || req.ip,
  },
);

export const reportLimiter = createLimiter(
  mins(15),
  10,
  "Too many report requests. Please try again after 15 minutes.",
  {
    keyGenerator: (req) => req.user?.id || req.ip,
  },
);

export const aiLimiter = createLimiter(
  hours(1),
  20,
  "Too many AI requests. Please try again after 1 hour.",
  {
    keyGenerator: (req) => req.user?.id || req.ip,
  },
);

export const refreshLimiter = createLimiter(
  mins(15),
  10,
  "Too many token refresh attempts. Please login again.",
);

export const webhookLimiter = createLimiter(
  mins(1),
  30,
  "Too many webhook requests.",
  {
    keyGenerator: (req) => req.ip,
  },
);
