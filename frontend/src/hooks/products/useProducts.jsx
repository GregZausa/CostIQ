import { use, useMemo } from "react";
import { useProductsAction } from "./useProductsAction";
import { useProductsForm } from "./useProductsForm";
import { useProductsQuery } from "./useProductsQuery";

const useProducts = () => {
  const form = useProductsForm();
  const query = useProductsQuery();
  const actions = useProductsAction({ query, form });

  const totalProducts = query.products.length;
  const mostExpensive = query.mostExpensive;

  const half = Math.floor(query.computedProducts.length / 2);
  const limit = Math.min(5, half);

  const products = [...query.computedProducts];
  const sortHelper = (arr, key, limit, desc = true) =>
    [...arr]
      .sort((a, b) => (desc ? b[key] - a[key] : a[key] - b[key]))
      .slice(0, limit)
      .map((p) => ({ name: p.product_name, data: p[key] }));

  const cogsVsSellingPriceChartData = useMemo(() => {
    return [...products]
      .sort((a, b) => b.finalPrice - a.finalPrice)
      .map((p) => ({
        name: p.product_name,
        cogs: p.totalCPP.toFixed(2),
        sellingPrice: p.finalPrice.toFixed(2),
      }));
  }, [products, limit]);

  const mostExpensiveProduct = useMemo(() => sortHelper(products, "totalCPP", limit), [products, limit]);

  const top5ProfitableProduct = useMemo(() => sortHelper(products, "profit", limit), [products, limit]);

  const bottom5LeastProfitableProduct = useMemo(() => sortHelper(products, "profit", limit, false), [products, limit]);

  const top5ROIProduct = useMemo(() => sortHelper(products, "roi", limit), [products, limit]);

  return {
    mostExpensive,
    cogsVsSellingPriceChartData,
    mostExpensiveProduct,
    top5ProfitableProduct,
    top5ROIProduct,
    bottom5LeastProfitableProduct,
    totalProducts,
    form,
    query,
    actions,
  };
};

export default useProducts;
