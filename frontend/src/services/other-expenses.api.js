import { authFetch } from "../utils/authFetch";
import { apiUrl } from "../config/apiUrl";

export const addOtherExpenses = async ({ editingId = null, payload }) => {
  const url = editingId
    ? `${apiUrl}/other-expenses/${editingId}`
    : `${apiUrl}/other-expenses`;

  const method = editingId ? `PUT` : "POST";
  const res = await authFetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const fetchOtherExpenses = async ({
  search = "",
  page = 1,
  limit = 8,
} = {}) => {
  const urlParams = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await authFetch(
    `${apiUrl}/other-expenses?${urlParams.toString()}`,
  );
  return res.json();
};

export const fetchOtherExpensesById = async ({ id }) => {
  const res = await authFetch(`${apiUrl}/other-expenses/${id}`);
  return res.json();
};

export const deleteOtherExpenses = async ({ id }) => {
  const res = await authFetch(`${apiUrl}/other-expenses/${id}`, {
    method: "DELETE",
  });
  return res.json();
};