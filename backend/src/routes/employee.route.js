import express from "express";
import { globalLimiter } from "../middleware/rate-limiter.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createEmployee,
  fetchEmployees,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/employees", globalLimiter, requireAuth, createEmployee);
router.get("/employees", requireAuth, fetchEmployees);

export default router;
