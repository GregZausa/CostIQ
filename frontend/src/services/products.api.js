import { apiUrl } from "../config/apiUrl";
import { authFetch } from "../utils/authFetch";

export const fetchAllProducts = async () => {
  const res = await authFetch(`${apiUrl}/products`);
  return res.json();
};

export const fetchSelectedProduct = async ({ selectedProduct }) => {
  const res = await authFetch(`${apiUrl}/products/${selectedProduct}`);
  return res.json();
};

export const fetchComputedProducts = async () => {
  const res = await authFetch(`${apiUrl}/products/computed`);
  return res.json();
};

export const fetchPaginatedProducts = async ({
  search = "",
  page = 1,
  limit = 8,
} = {}) => {
  const urlParams = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await authFetch(`${apiUrl}/products?${urlParams.toString()}`);
  return res.json();
};
