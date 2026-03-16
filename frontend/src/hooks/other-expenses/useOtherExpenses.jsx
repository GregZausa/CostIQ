import React from "react";
import { useOtherExpensesForm } from "./useOtherExpensesForm";
import { useOtherExpensesQuery } from "./useOtherExpensesQuery";
import { useOtherExpensesAction } from "./useOtherExpensesAction";

const useOtherExpenses = ({ setIsLoading, onSuccess, openModal } = {}) => {
  const form = useOtherExpensesForm();
  const query = useOtherExpensesQuery();
  const actions = useOtherExpensesAction({
    form,
    query,
    setIsLoading,
    onSuccess,
    openModal,
  });

  const totalOtherExpenses = query.totalRows;
  return {
    totalOtherExpenses,
    form,
    query,
    actions,
  };
};

export default useOtherExpenses;
