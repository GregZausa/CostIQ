import { usePositionAction } from "./usePositionAction";
import { usePositionForm } from "./usePositionForm";
import { usePositionQuery } from "./usePositionQuery";

const usePosition = () => {
  const positionForm = usePositionForm();
  const positionQuery = usePositionQuery();
  const positionActions = usePositionAction({
    positionForm,
  });

  const positionOptions = positionQuery.positions.map((p) => ({
    label: p.position_name.toUpperCase(),
    value: p.position_id,
  }));

  return {
    positionOptions,
    positionForm,
    positionActions,
    positionQuery,
  };
};

export default usePosition;
