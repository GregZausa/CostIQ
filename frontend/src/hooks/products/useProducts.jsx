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

  const half = Math.floor(query.computedProducts?.length / 2);
  const limit = Math.min(5, half);

  const products = useMemo(
    () => [...query.computedProducts ?? []],
    [query.computedProducts],
  );

  const avgCOGS = useMemo(() => medianHelper(products, "totalCPP"), [products]);
  const avgProfit = useMemo(() => medianHelper(products, "profit"), [products]);

  const maxCOGS = Number(Math.max(...products.map((p) => p.totalCPP), 1));

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

  const revenueGapChartData = useMemo(() => {
    return products.map((p) => {
      const finalPrice = Number(p.finalPrice) || 0;
      const units = Number(p.total_sellable_units) || 0;
      const breakEven = Number(p.breakEvenRevenue) || 0;

      const revenueCapacity = finalPrice * units;
      const gap = revenueCapacity - breakEven;

      return {
        name: p.product_name,
        breakEvenRevenue: +breakEven.toFixed(2),
        gap: +gap.toFixed(2),
        revenueAtCapacity: +revenueCapacity.toFixed(2),
      };
    });
  }, [products]);

  const radarChartData = [
    { metric: "Profit Margin" },
    { metric: "ROI" },
    { metric: "COGS Efficiency" },
    { metric: "Break-even Score" },
    { metric: "Profitability" },
  ].map((row, i) => {
    const result = { metric: row.metric };
    products.forEach((p) => {
      if (i === 0) result[p.product_name] = Number(p.profit_margin);
      if (i === 1) result[p.product_name] = Math.min(Number(p.roi), 100);
      if (i === 2)
        result[p.product_name] = Math.max(
          100 - (p.totalCPP / maxCOGS) * 100,
          0,
        );
      if (i === 3)
        result[p.product_name] = Math.max(
          100 -
            ((p.breakEvenUnits ?? 0) / Number(p.total_sellable_units)) * 100,
          0,
        );
      if (i === 4)
        result[p.product_name] = Math.max((p.profit / p.finalPrice) * 100, 0);
    });
    return result;
  });

  const mostExpensiveProduct = useMemo(() => {
    return sortHelper(products, "totalCPP", limit);
  }, [products, limit]);

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
    products,
    avgCOGS,
    avgProfit,
    performanceMatrixData,
    radarChartData,
    cogsVsSellingPriceChartData,
    revenueGapChartData,
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
