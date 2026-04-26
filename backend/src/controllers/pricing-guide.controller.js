import {
  fetchPricingGuidePDFService,
  fetchPricingGuideExcelService,
} from "../services/pricing-guide.services.js";

export const fetchPricingGuidePDF = async (req, res) => {
  try {
    const { maxDiscount = 50, step = 10, productId = null } = req.query;
    const pdf = await fetchPricingGuidePDFService(
      req.user.id,
      Number(maxDiscount),
      Number(step),
      productId,
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=costiq-pricing-guide.pdf",
    );
    res.send(pdf);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to generate PDF", error: err.message });
  }
};

export const fetchPricingGuideExcel = async (req, res) => {
  try {
    const { maxDiscount = 50, step = 10, productId = null } = req.query;
    const excel = await fetchPricingGuideExcelService(
      req.user.id,
      Number(maxDiscount),
      Number(step),
      productId,
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=costiq-pricing-guide.xlsx",
    );
    res.send(excel);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to generate Excel", error: err.message });
  }
};
