import { useProductsAction } from "./useProductsAction";
import { useProductsForm } from "./useProductsForm";
import { useProductsQuery } from "./useProductsQuery";

const useProducts = () => {
  const form = useProductsForm();
  const query = useProductsQuery();
  const actions = useProductsAction({query, form})

  const totalProducts = query.products.length;

  return {
    totalProducts,
    form,
    query,
    actions,
  };
};

export default useProducts;
