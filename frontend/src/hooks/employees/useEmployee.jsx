import React from "react";
import { useEmployeeForm } from "./useEmployeeForm";
import { useEmployeeQuery } from "./useEmployeeQuery";
import { useEmployeeAction } from "./useEmployeeAction";

const useEmployee = ({ closeModal, openModal, setIsLoading } = {}) => {
  const form = useEmployeeForm();
  const query = useEmployeeQuery();
  const actions = useEmployeeAction({
    form,
    query,
    closeModal,
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
