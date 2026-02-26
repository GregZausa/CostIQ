import { usePositionAction } from "./usePositionAction";
import { usePositionForm } from "./usePositionForm";
import { usePositionQuery } from "./usePositionQuery";

const usePosition = () => {
  const positionForm = usePositionForm();
  const positionQuery = usePositionQuery();
  const positionActions = usePositionAction({
    positionForm,
  });

  const positions = positionQuery.positions;


  return {
    positions,
    positionForm,
    positionActions,
    positionQuery,
  };
};

export default usePosition;
