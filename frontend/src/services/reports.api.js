import { apiUrl } from "../config/apiUrl";
import { authFetch } from "../utils/authFetch";
import toast from "react-hot-toast";

export const downloadProductCostSummaryPDF = async (reportType = "batch") => {
  const res = await authFetch(
    `${apiUrl}/product-cost-summary/pdf?type=${reportType}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) {
    const error = await res.text();
    console.error(error);
    toast.error("failed to download PDF");
    return;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const today = new Date().toISOString().split("T")[0];

  const a = document.createElement("a");
  a.href = url;
  a.download = `product-summary-${today}.pdf`;
  a.click();

  window.URL.revokeObjectURL(url);
};

export const downloadProductCostSummaryExcel = async (reportType = "batch") => {
  const res = await authFetch(
    `${apiUrl}/product-cost-summary/excel?type=${reportType}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) {
    const error = await res.text();
    console.error(error);
    toast.error("failed to download Excel");
    return;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const today = new Date().toISOString().split("T")[0];

  const a = document.createElement("a");
  a.href = url;
  a.download = `product-summary-${today}.xlsx`;
  a.click();

  window.URL.revokeObjectURL(url);
};

export const downloadFinancialOverviewPDF = async (reportType = "batch") => {
  const res = await authFetch(
    `${apiUrl}/financial-overview/pdf?type=${reportType}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) {
    toast.error("Failed to download PDF");
    return;
  }
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const today = new Date().toISOString().split("T")[0];
  const a = document.createElement("a");
  a.href = url;
  a.download = `financial-overview-${reportType}-${today}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const downloadFinancialOverviewExcel = async (reportType = "batch") => {
  const res = await authFetch(
    `${apiUrl}/financial-overview/excel?type=${reportType}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) {
    toast.error("Failed to download Excel");
    return;
  }
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const today = new Date().toISOString().split("T")[0];
  const a = document.createElement("a");
  a.href = url;
  a.download = `financial-overview-${reportType}-${today}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const downloadPricingGuidePDF = async (maxDiscount = 50, step = 10, productId = null) => {
  const params = new URLSearchParams({ maxDiscount, step })
  if (productId) params.append("productId", productId)
  const res = await authFetch(`${apiUrl}/pricing-guide/pdf?${params}`, {
    method: "GET", credentials: "include",
  })
  if (!res.ok) { toast.error("Failed to download PDF"); return }
  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const today = new Date().toISOString().split("T")[0]
  const a = document.createElement("a")
  a.href = url
  a.download = `pricing-guide-${today}.pdf`
  a.click()
  window.URL.revokeObjectURL(url)
}

export const downloadPricingGuideExcel = async (maxDiscount = 50, step = 10, productId = null) => {
  const params = new URLSearchParams({ maxDiscount, step })
  if (productId) params.append("productId", productId)
  const res = await authFetch(`${apiUrl}/pricing-guide/excel?${params}`, {
    method: "GET", credentials: "include",
  })
  if (!res.ok) { toast.error("Failed to download Excel"); return }
  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const today = new Date().toISOString().split("T")[0]
  const a = document.createElement("a")
  a.href = url
  a.download = `pricing-guide-${today}.xlsx`
  a.click()
  window.URL.revokeObjectURL(url)
}
