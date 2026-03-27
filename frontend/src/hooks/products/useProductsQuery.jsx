import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  fetchAllProducts,
  fetchComputedProducts,
  fetchSelectedProduct,
} from "../../services/products.api";

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
      const [allProducts, computedProducts] = await Promise.all([
        fetchAllProducts(),
        fetchComputedProducts(),
      ]);
      setProducts(allProducts.products);
      setMostExpensive(allProducts.mostExpensiveProduct);
      setHighestROI(allProducts.highestROIProduct);
      setComputedProducts(computedProducts.products);
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
      const result = await fetchSelectedProduct({ selectedProduct });
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
