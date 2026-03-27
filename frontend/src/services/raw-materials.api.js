import { authFetch } from "../utils/authFetch";
import { apiUrl } from "../config/apiUrl";

export const addRawMaterials = async ({ editingId = null, payload }) => {
  const url = editingId
    ? `${apiUrl}/raw-materials/${editingId}`
    : `${apiUrl}/raw-materials`;

  const method = editingId ? `PUT` : "POST";
  const res = await authFetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const fetchRawMaterials = async ({
  search = "",
  page = 1,
  selectedUnit = null,
  limit = 8,
} = {}) => {
  const urlParams = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (selectedUnit) {
    urlParams.append("packUnit", selectedUnit);
  }

  const res = await authFetch(
    `${apiUrl}/raw-materials?${urlParams.toString()}`,
  );
  return res.json();
};

export const fetchRawMaterialById = async ({ id }) => {
  const res = await authFetch(`${apiUrl}/raw-materials/${id}`);
  return res.json();
};

export const deleteRawMaterial = async ({ id }) => {
  const res = await authFetch(`${apiUrl}/raw-materials/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
