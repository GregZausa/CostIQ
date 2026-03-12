import { useCallback } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";
import { useEffect } from "react";
import { useState } from "react";

export const useProductsQuery = () => {
  const [products, setProducts] = useState([]);
  const loadProducts = useCallback(async () => {
    try {
      const res = await authFetch(`${apiUrl}/products`);
      const result = await res.json();
      setProducts(result);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  },[]);
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const productOptions = products.map((p) => ({
    label: p.product_name.toUpperCase(),
    value: p.product_id,
  }));
  return {
    products,
    productOptions,
  };
};
