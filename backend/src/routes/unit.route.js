import express from "express";
import { fetchPackUnits } from "../controllers/unit.controller.js";


const router = express.Router();
router.get("/units", fetchPackUnits);

export default router;