import useUnits from "../useUnits";
import { useRawMaterialsAction } from "./useRawMaterialsAction";
import { useRawMaterialsForm } from "./useRawMaterialsForm";
import { useRawMaterialsQuery } from "./useRawMaterialsQuery";

const useRawMaterials = ({ closeModal, openModal, setIsLoading } = {}) => {
  const { units } = useUnits();
  const form = useRawMaterialsForm({ units });
  const query = useRawMaterialsQuery();
  const actions = useRawMaterialsAction({
    form,
    query,
    closeModal,
    openModal,
    setIsLoading,
  });

  const totalRawMaterials = query.totalRows;
  const mostExpensiveMaterial = query.data.reduce(
    (max, cur) =>
      Number(cur.cost_per_unit) > Number(max.cost_per_unit) ? cur : max,
    query.data[0],
  );

  return {
    form,
    query,
    actions,
    totalRawMaterials,
    mostExpensiveMaterial,
  };
};

export default useRawMaterials;
