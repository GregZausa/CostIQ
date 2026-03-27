import { authFetch } from "../utils/authFetch";
import { apiUrl } from "../config/apiUrl";

export const addPositions = async ({ editingId = null, payload }) => {
  const url = editingId
    ? `${apiUrl}/positions/${editingId}`
    : `${apiUrl}/positions`;

  const method = editingId ? `PUT` : "POST";
  const res = await authFetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const fetchPositions = async ({
  search = "",
  page = 1,
  limit = 3,
} = {}) => {
  const urlParams = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await authFetch(`${apiUrl}/positions?${urlParams.toString()}`);
  return res.json();
};

export const fetchPositionsById = async ({ id }) => {
  const res = await authFetch(`${apiUrl}/positions/${id}`);
  return res.json();
};

export const deletePosition = async ({ id }) => {
  const res = await authFetch(`${apiUrl}/positions/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
