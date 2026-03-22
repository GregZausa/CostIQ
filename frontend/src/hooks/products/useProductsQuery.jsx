import { useCallback } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";
import { useEffect } from "react";
import { useState } from "react";

export const useProductsQuery = () => {
  const [products, setProducts] = useState([]);
  const [computedProducts, setComputedProducts] = useState([]);
  const [mostExpensive, setMostExpensive] = useState(null);
  const [highestROI, setHighestROI] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const productOptions = (products ?? []).map((p) => ({
    label: p.product_name.toUpperCase(),
    value: p.product_id,
  }));

  const loadProducts = useCallback(async () => {
    try {
      const [productRes, computedRes] = await Promise.all([
        authFetch(`${apiUrl}/products`),
        authFetch(`${apiUrl}/products/computed`),
      ]);
      const result = await productRes.json();
      const computedResult = await computedRes.json();
      setProducts(result.products);
      setMostExpensive(result.mostExpensiveProduct);
      setHighestROI(result.highestROIProduct);
      setComputedProducts(computedResult.products);
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
    computedProducts,
    mostExpensive,
    highestROI,
    productOptions,
    selectedProduct,
    setSelectedProduct,
    productDetail,
  };
};
