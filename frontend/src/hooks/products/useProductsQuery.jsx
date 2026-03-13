import { useCallback } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";
import { useEffect } from "react";
import { useState } from "react";

export const useProductsQuery = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const productOptions = products.map((p) => ({
    label: p.product_name.toUpperCase(),
    value: p.product_id,
  }));

  const loadProducts = useCallback(async () => {
    try {
      const res = await authFetch(`${apiUrl}/products`);
      const result = await res.json();
      setProducts(result);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  }, []);
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(productOptions[0].value);
    }
  }, [products]);

  const loadSelectedProduct = useCallback(async () => {
    if (!selectedProduct) return;
    try {
      const res = await authFetch(`${apiUrl}/products/${selectedProduct}`);
      const result = await res.json();
      setProductDetail(result);
      console.log(productDetail);
    } catch (err) {
      console.error("Failed to fetch product", err);
    }
  }, [selectedProduct]);
  useEffect(() => {
    loadSelectedProduct();
  }, [loadSelectedProduct]);

  return {
    products,
    productOptions,
    selectedProduct,
    setSelectedProduct,
    productDetail,
  };
};
