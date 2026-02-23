import express from "express";
import { globalLimiter } from "../middleware/rate-limiter.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createEmployee,
  editEmployee,
  fetchEmployees,
  fetchEmployeesById,
  removeEmployees,
} from "../controllers/employee.controller.js";

const router = express.Router();
router.use(requireAuth);

router.post("/employees", globalLimiter, createEmployee);
router.get("/employees",  fetchEmployees);
router.get("/employees/:id",  fetchEmployeesById);
router.delete("/employees/:id",  removeEmployees);
router.put("/employees/:id", globalLimiter,  editEmployee);

export default router;
