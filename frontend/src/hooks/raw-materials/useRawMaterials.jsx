import useUnits from "../useUnits";
import { useRawMaterialsAction } from "./useRawMaterialsAction";
import { useRawMaterialsForm } from "./useRawMaterialsForm";
import { useRawMaterialsQuery } from "./useRawMaterialsQuery";

const useRawMaterials = ({ onSuccess, openModal, setIsLoading } = {}) => {
  const { units } = useUnits();
  const form = useRawMaterialsForm({ units });
  const query = useRawMaterialsQuery();
  const actions = useRawMaterialsAction({
    form,
    query,
    onSuccess,
    openModal,
    setIsLoading,
  });

  const totalRawMaterials = query.totalAllRows;
  const mostExpensiveMaterial = query.mostExpensive;

  return {
    form,
    query,
    actions,
    totalRawMaterials,
    mostExpensiveMaterial,
  };
};

export default useRawMaterials;
