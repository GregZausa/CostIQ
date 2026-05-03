import { fetchWhatIfPDFService, fetchWhatIfExcelService } from "../services/what-if-income-goal-report.services.js";

export const fetchWhatIfPDF = async (req, res) => {
  try {
    const { productId, goal, batchesPerDay = 0 } = req.query;
    if (!productId || !goal) return res.status(400).json({ message: "productId and goal are required" });
    const pdf = await fetchWhatIfPDFService(req.user.id, productId, Number(goal), Number(batchesPerDay));
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=costiq-what-if-report.pdf");
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate PDF", error: err.message });
  }
};

export const fetchWhatIfExcel = async (req, res) => {
  try {
    const { productId, goal, batchesPerDay = 0 } = req.query;
    if (!productId || !goal) return res.status(400).json({ message: "productId and goal are required" });
    const excel = await fetchWhatIfExcelService(req.user.id, productId, Number(goal), Number(batchesPerDay));
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=costiq-what-if-report.xlsx");
    res.send(excel);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate Excel", error: err.message });
  }
};