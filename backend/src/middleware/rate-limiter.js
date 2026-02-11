import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts, please try again after 1 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  message: {
    message: "Too many registration attempts, please try again after 1 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    message: "Something went wrong, please try again after 1 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
