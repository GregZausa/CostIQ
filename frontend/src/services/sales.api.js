import { authFetch } from "../utils/authFetch";
import { apiUrl } from "../config/apiUrl";

export const logSale = (data) =>
  authFetch(`${apiUrl}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const getDashboardSales = () =>
  authFetch(`${apiUrl}/sales/dashboard`).then((r) => r.json());

export const getTodaySales = () =>
  authFetch(`${apiUrl}/sales/today`).then((r) => r.json());

export const getMonthlySales = (year, month) =>
  authFetch(`${apiUrl}/sales/monthly?year=${year}&month=${month}`).then((r) =>
    r.json(),
  );

export const updateGoal = (goal) =>
  authFetch(`${apiUrl}/sales/goal`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal }),
  }).then((r) => r.json());
