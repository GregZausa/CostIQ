import React from "react";
import { useEmployeeForm } from "./useEmployeeForm";
import { useEmployeeQuery } from "./useEmployeeQuery";
import { useEmployeeAction } from "./useEmployeeAction";

const useEmployee = ({ closeModal, setIsLoading } = {}) => {
  const form = useEmployeeForm();
  const query = useEmployeeQuery();
  const actions = useEmployeeAction({ form, query, closeModal, setIsLoading });
  return {
    form,
    query,
    actions,
  };
};

export default useEmployee;
