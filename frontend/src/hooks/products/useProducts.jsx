import { useProductsAction } from "./useProductsAction";
import { useProductsForm } from "./useProductsForm";
import { useProductsQuery } from "./useProductsQuery";

const useProducts = () => {
  const form = useProductsForm();
  const query = useProductsQuery();
  const actions = useProductsAction({ query, form });

  const totalProducts = query.products.length;
  const mostExpensive = query.mostExpensive;
  const lowestProfitable = query.lowestProfitable;
  const mostProfitable = query.mostProfitable;
  const highestROI = query.highestROI;

  const cogsVsSellingPriceChartData = query.computedProducts.map((p) => ({
    name: p.product_name,
    cogs: p.totalCPP.toFixed(2),
    sellingPrice: p.finalPrice.toFixed(2),
  }));

  const profitMarginChartData = query.computedProducts
    .map((p) => ({
      name: p.product_name,
      profitMargin: Number(p.profit_margin),
    }))
    .sort((a, b) => b.profitMargin - a.profitMargin);

  return {
    mostExpensive,
    cogsVsSellingPriceChartData,
    profitMarginChartData,
    highestROI,
    mostProfitable,
    totalProducts,
    lowestProfitable,
    form,
    query,
    actions,
  };
};

export default useProducts;
