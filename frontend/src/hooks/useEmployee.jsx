import { useReducer, useEffect, useState } from "react";
import { apiUrl } from "../config/apiUrl";
import toast from "react-hot-toast";
import { authFetch } from "../utils/authFetch";


const useEmployee = ({ setIsLoading, closeModal } = {}) => {

  useEffect(() => {
    loadEmployees();
  }, [page, search]);
  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      dispatch({ type: "SET_ERRORS", errors });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true)
      const res = await fetch(`${apiUrl}/employees`, {
        method: "POST",
        body: JSON.stringify({
          last_name: state.employeeLastName,
          first_name: state.employeeFirstName,
          rate_per_hr: state.ratePerHr,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Failed to add employee");
        return;
      }
      toast.success("Employee added successfully!");
      dispatch({ type: "RESET_FORM" });
      closeModal();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/employees/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      console.log("Employee deleted", result);
      loadEmployees();
    } catch (err) {
      console.error("Failed to delete employee", err);
    }
  };
  const loadEmployees = async () => {
    try {
      const urlParams = new URLSearchParams({ search, page, limit: 8 });
      const res = await authFetch(`${apiUrl}/employees?${urlParams}`);
      const result = await res.json();
      setColumns(result.headers);
      setData(result.rows);
      setTotalPages(result.totalPages);
      setPage(result.page);
    } catch (err) {
      console.error("Failed to load employees data", err);
    }
  };

  return {
    handleChange,
    handleSubmit,
    handleDelete,
    loadEmployees,
    data,
    columns,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    state,
  };
};

export default useEmployee;
