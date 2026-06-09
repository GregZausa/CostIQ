import { useCallback, useEffect, useState } from "react";
import {
  getDashboardSales,
  getTodaySales,
  logSale,
  updateGoal,
} from "../../services/sales.api";
import toast from "react-hot-toast";

export const useSales = () => {
  const [dashboard, setDashboard] = useState(null);
  const [todaySales, setTodaySales] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const [dash, today] = await Promise.all([
        getDashboardSales(),
        getTodaySales(),
      ]);
      setDashboard(dash);
      setTodaySales(today.sales ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleLogSale = async ({ productId, unitsSold, date, notes }) => {
    try {
      await logSale({ productId, unitsSold, date, notes });
      toast.success("Sale logged! 🔥");
      await fetchDashboard();
    } catch {
      toast.error("Failed to log sale.");
    }
  };

  const handleUpdateGoal = async (goal) => {
    try {
      await updateGoal(goal);
      toast.success("Monthly goal updated!");
      await fetchDashboard();
    } catch {
      toast.error("Failed to update goal.");
    }
  };

  return {
    dashboard,
    todaySales,
    loading,
    handleLogSale,
    handleUpdateGoal,
    refetch: fetchDashboard,
  };
};
