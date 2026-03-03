import { useProductsForm } from "./useProductsForm";
import { useProductsQuery } from "./useProductsQuery";

const useProducts = () => {
  const form = useProductsForm();
  const query = useProductsQuery();

  return {
    form,
    query,
  };
};

export default useProducts;
