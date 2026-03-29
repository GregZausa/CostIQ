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

  const totalEmployees = query.totalAllRows;
  const mostUsedPosition = query.mostUsedPosition;
  const mostUsedEmployee = query.mostUsedEmployee;
  const mostPaidEmployee = query.mostPaid;
  return {
    totalEmployees,
    mostUsedPosition,
    mostUsedEmployee,
    mostPaidEmployee,
    form,
    query,
    actions,
  };
};

export default useEmployee;
