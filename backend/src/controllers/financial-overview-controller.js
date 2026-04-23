import { fetchFinancialOverviewPDFService, fetchFinancialOverviewExcelService } from "../services/financial-overview.services.js";

export const fetchFinancialOverviewPDF = async (req, res) => {
  try {
    const pdf = await fetchFinancialOverviewPDFService(req.user.id, req.query.type || "batch");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=costiq-financial-overview.pdf");
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate PDF", error: err.message });
  }
};

export const fetchFinancialOverviewExcel = async (req, res) => {
  try {
    const excel = await fetchFinancialOverviewExcelService(req.user.id, req.query.type || "batch");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=costiq-financial-overview.xlsx");
    res.send(excel);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate Excel", error: err.message });
  }
};