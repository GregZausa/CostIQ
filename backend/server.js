import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.route.js";
import unitRoutes from "./src/routes/unit.route.js";
import rawMaterialRoutes from "./src/routes/raw-materials.route.js";
import employeeRoutes from "./src/routes/employee.route.js";
import otherExpenseRoutes from "./src/routes/other-expense.route.js";
import positionRoutes from "./src/routes/position.routes.js";
import productRoutes from "./src/routes/product.route.js";
import productCostSummary from "./src/routes/product-cost-summary.route.js";
import financialOverview from "./src/routes/financial-overview.route.js";
import pricingGuide from "./src/routes/pricing-guide.route.js";
import dotenv from "dotenv";
dotenv.config();
import "./src/config/db.js";
import "./src/jobs/cleanupPositions.js";

const app = express();
const port = process.env.PORT || "5001";

app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  }),
);
app.use(cookieParser());
//routes
app.use("/api/auth", express.json(), authRoutes);
app.use("/api", express.json(), unitRoutes);
app.use("/api", express.json(), rawMaterialRoutes);
app.use("/api", express.json(), employeeRoutes);
app.use("/api", express.json(), otherExpenseRoutes);
app.use("/api", express.json(), positionRoutes);
app.use("/api", productRoutes);
app.use("/api", express.json(), productCostSummary);
app.use("/api", express.json(), financialOverview);
app.use("/api", express.json(), pricingGuide);


app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
