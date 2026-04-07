import { useCallback, useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchComputedProducts,
  fetchPaginatedProducts,
  fetchSelectedProduct,
} from "../../services/products.api";

export const useProductsQuery = () => {
  const [products, setProducts] = useState([]);
  const [computedProducts, setComputedProducts] = useState([]);
  const [mostExpensive, setMostExpensive] = useState(null);
  const [highestROI, setHighestROI] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productDetail, setProductDetail] = useState(null);

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState();
  const [totalAllRows, setTotalAllRows] = useState();
  const [search, setSearch] = useState("");

  const productOptions = (products ?? []).map((p) => ({
    label: p.product_name.toUpperCase(),
    value: p.product_id,
  }));

  const loadPaginatedProducts = useCallback(async () => {
    try {
      const result = await fetchPaginatedProducts({
        search,
        page,
      });
      const rows = result.rows ?? [];
      setData(rows);
      if (rows.length > 0) setColumns(Object.keys(rows[0]));
      setPage(result.page);
      setTotalPages(result.totalPages);
      setTotalRows(result.totalRows);
      setTotalAllRows(result.totalAllRows);
    } catch (err) {
      console.error(err);
    }
  }, [search, page]);

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

  const loadSelectedProduct = useCallback(async () => {
    if (!selectedProduct) return;
    try {
      const result = await fetchSelectedProduct({ selectedProduct });
      setProductDetail(result);
    } catch (err) {
      console.error("Failed to fetch product", err);
    }
  }, [selectedProduct]);

  useEffect(() => {
    loadPaginatedProducts();
  }, [loadPaginatedProducts]);

  useEffect(() => {
    setPage(1);
  }, [search]);
  
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(productOptions[0].value);
    }
  }, [products]);
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
    data,
    setData,
    totalRows,
    totalAllRows,
    columns,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    loadPaginatedProducts,
  };
};
