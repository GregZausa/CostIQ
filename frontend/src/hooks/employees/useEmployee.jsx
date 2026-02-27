import React from "react";
import { useEmployeeForm } from "./useEmployeeForm";
import { useEmployeeQuery } from "./useEmployeeQuery";
import { useEmployeeAction } from "./useEmployeeAction";
import usePosition from "../positions/usePosition";

const useEmployee = ({ onSuccess, openModal, setIsLoading } = {}) => {
  const { positions } = usePosition();
  const form = useEmployeeForm({ positions });
  const query = useEmployeeQuery();
  const actions = useEmployeeAction({
    form,
    query,
    onSuccess,
    openModal,
    setIsLoading,
  });
  return {
    form,
    query,
    actions,
  };
};

export default useEmployee;
