import { useReducer, useEffect, useState } from "react";
import { apiUrl } from "../config/apiUrl";
import toast from "react-hot-toast";

const initialState = {
  employeeFirstName: "",
  employeeLastName: "",
  ratePerHr: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}
const useEmployee = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

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
    const errors = {};

    if (!state.employeeFirstName)
      errors.employeeFirstName = "Employee first name is required!";

    if (!state.employeeLastName)
      errors.employeeLastName = "Employee last name is required!";

    if (!state.ratePerHr) errors.ratePerHr = "Rate per hour is required!";

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
    } catch (err) {}
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/employees/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      const token = localStorage.getItem("token");
      const urlParams = new URLSearchParams({ search, page, limit: 8 });
      const res = await fetch(`${apiUrl}/employees?${urlParams.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
