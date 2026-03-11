import { useCallback } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

export const useProductsQuery = () => {
    
  const loadProducts = useCallback(async () => {
    try {
      const res = authFetch(`${apiUrl}/products`);
      const result = await res.json();

    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  });
};
