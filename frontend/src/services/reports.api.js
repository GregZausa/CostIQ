import { apiUrl } from "../config/apiUrl";
import { authFetch } from "../utils/authFetch";
import toast from "react-hot-toast";

export const downloadProductCostSummaryPDF = async () => {
    const res = await authFetch(`${apiUrl}/product-cost-summary/pdf`, {
      method: "GET",
      credentials: "include",
    });
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

  export const downloadProductCostSummaryExcel = async () => {
    const res = await authFetch(`${apiUrl}/product-cost-summary/excel`, {
      method: "GET",
      credentials: "include",
    });
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