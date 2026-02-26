import {
  deleteEmployee,
  getEmployees,
  getEmployeesById,
  insertEmployee,
  updateEmployee,
} from "../models/employee.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const createEmployee = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const { last_name, first_name, position, rate_per_hr  } = req.body;

    const employee = await insertEmployee({
      last_name,
      first_name,
      position,
      rate_per_hr,
      created_by: createdBy,
    });
    res.status(201).json({ message: "Employee added successfully!", employee });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add employee", error: err.message });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const { id } = req.params;
    const { last_name, first_name, rate_per_hr } = req.body;
    const editedEmployee = await updateEmployee(
      last_name,
      first_name,
      rate_per_hr,
      createdBy,
      id,
    );
    if (!editedEmployee) {
      res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee credential updated successfully!",
      editedEmployee,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to edit employee credentials",
      error: err.message,
    });
  }
};

export const fetchEmployees = async (req, res) => {
  try {
    const { page, limit, offset, searchTerm, createdBy } =
      getPaginationParams(req);
    const employees = await getEmployees(
      createdBy,
      searchTerm,
      limit,
      offset,
      page,
    );
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employees", error: err });
  }
};

export const fetchEmployeesById = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const { id } = req.params;
    const employeeById = await getEmployeesById(createdBy, id);
    if (!employeeById) {
      res.status(404).json({ message: "Employee not found" });
    }
    res.json(employeeById);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch employee", error: err.message });
  }
};

export const removeEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await deleteEmployee(id);
    if (!employee) {
      res.status(404).json({ message: "Employee not found", error: err });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete employee", error: err });
  }
};
