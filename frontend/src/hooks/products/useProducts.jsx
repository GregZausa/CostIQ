import { useProductsAction } from "./useProductsAction";
import { useProductsForm } from "./useProductsForm";
import { useProductsQuery } from "./useProductsQuery";

const useProducts = () => {
  const form = useProductsForm();
  const query = useProductsQuery();
  const actions = useProductsAction({query, form})

  const totalProducts = query.products.length;
  const mostExpensive = query.mostExpensive;
  const lowestProfitable = query.lowestProfitable;
  const mostProfitable = query.mostProfitable;
  const highestROI = query.highestROI;

  return {
    mostExpensive,
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
