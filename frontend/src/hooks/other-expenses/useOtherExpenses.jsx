import React from "react";
import { useOtherExpensesForm } from "./useOtherExpensesForm";
import { useOtherExpensesQuery } from "./useOtherExpensesQuery";
import { useOtherExpensesAction } from "./useOtherExpensesAction";

const useOtherExpenses = ({ setIsLoading, closeModal, openModal } = {}) => {
  const form = useOtherExpensesForm();
  const query = useOtherExpensesQuery();
  const actions = useOtherExpensesAction({
    form,
    query,
    setIsLoading,
    closeModal,
    openModal,
  });
  return {
    form,
    query,
    actions,
  };
};

export default useOtherExpenses;
