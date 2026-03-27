import { authFetch } from "../utils/authFetch";
import { apiUrl } from "../config/apiUrl";

export const addEmployees = async ({ editingId = null, payload }) => {
  const url = editingId
    ? `${apiUrl}/employees/${editingId}`
    : `${apiUrl}/employees`;

  const method = editingId ? `PUT` : "POST";
  const res = await authFetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const fetchEmployees = async ({
  search = "",
  page = 1,
  limit = 8,
} = {}) => {
  const urlParams = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await authFetch(`${apiUrl}/employees?${urlParams.toString()}`);
  return res.json();
};

export const fetchEmployeesById = async ({ id }) => {
  const res = await authFetch(`${apiUrl}/employees/${id}`);
  return res.json();
};

export const deleteEmployee = async ({ id }) => {
  const res = await authFetch(`${apiUrl}/employees/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
