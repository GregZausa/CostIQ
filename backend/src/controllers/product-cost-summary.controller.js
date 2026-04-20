import {
  fetchProductCostSummaryExcelService,
  fetchProductCostSummaryPDFService,
} from "../services/product-cost-summary.services.js";

const today = new Date().toISOString().split("T")[0];

export const fetchProductCostSummaryPDF = async (req, res) => {
  try {
    const pdf = await fetchProductCostSummaryPDFService(req);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=costiq-product-cost-summary-${today}.pdf`,
    );
    res.send(pdf);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch Product Cost Summary",
      error: err.message,
    });
  }
};

export const fetchProductCostSummaryExcel = async (req, res) => {
  try {
    const buffer = await fetchProductCostSummaryExcelService(req);
    const today = new Date().toISOString().split("T")[0];

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=costiq-product-cost-summary-${today}.xlsx`,
    );

    res.send(buffer);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch Product Cost Summary",
      error: err.message,
    });
  }
};
