import { useMemo } from "react";
import { useProductsAction } from "./useProductsAction";
import { useProductsForm } from "./useProductsForm";
import { useProductsQuery } from "./useProductsQuery";
import { medianHelper, sortHelper } from "../../utils/mathHelper";

const useProducts = () => {
  const form = useProductsForm();
  const query = useProductsQuery();
  const actions = useProductsAction({ query, form });

  const totalProducts = query.products.length;
  const mostExpensive = query.mostExpensive;

  const half = Math.floor(query.computedProducts.length / 2);
  const limit = Math.min(5, half);

  const products = useMemo(
    () => [...query.computedProducts],
    [query.computedProducts],
  );

  const avgCOGS = useMemo(() => medianHelper(products, "totalCPP"), [products]);
  const avgProfit = useMemo(() => medianHelper(products, "profit"), [products]);

  const cogsVsSellingPriceChartData = useMemo(() => {
    return [...products]
      .sort((a, b) => b.finalPrice - a.finalPrice)
      .map((p) => ({
        name: p.product_name,
        cogs: p.totalCPP.toFixed(2),
        sellingPrice: p.finalPrice.toFixed(2),
      }));
  }, [products]);

  const performanceMatrixData = useMemo(
    () =>
      products.map((p) => ({
        name: p.product_name,
        x: p.totalCPP,
        y: p.profit,
        z: p.roi,
      })),
    [products],
  );

  const mostExpensiveProduct = useMemo(
    () => sortHelper(products, "totalCPP", limit),
    [products, limit],
  );

  const top5ProfitableProduct = useMemo(
    () => sortHelper(products, "profit", limit),
    [products, limit],
  );

  const bottom5LeastProfitableProduct = useMemo(
    () => sortHelper(products, "profit", limit, false),
    [products, limit],
  );

  const top5ROIProduct = useMemo(
    () => sortHelper(products, "roi", limit),
    [products, limit],
  );

  return {
    mostExpensive,
    avgCOGS,
    avgProfit,
    performanceMatrixData,
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
