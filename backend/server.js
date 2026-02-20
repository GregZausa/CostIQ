import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.route.js";
import unitRoutes from "./src/routes/unit.route.js";
import rawMaterialRoutes from "./src/routes/raw-materials.route.js";
import employeeRoutes from "./src/routes/employee.route.js";
import otherExpenseRoutes from "./src/routes/other-expense.route.js";
import dotenv from "dotenv";
dotenv.config();
import "./src/config/db.js";

const app = express();
const port = process.env.PORT || "5001";

app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  }),
);

app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api", unitRoutes);
app.use("/api", rawMaterialRoutes);
app.use("/api", employeeRoutes);
app.use("/api", otherExpenseRoutes);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
