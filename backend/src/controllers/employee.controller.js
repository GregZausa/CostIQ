import {
  createEmployeeService,
  editedEmployeeService,
  fetchEmployeesByIdService,
  fetchEmployeesService,
  removeEmployeesService,
} from "../services/employee.services.js";

export const createEmployee = async (req, res) => {
  try {
    const employee = await createEmployeeService({
      userId: req.user.id,
      body: req.body,
    });
    res.status(201).json({ message: "Employee added successfully!", employee });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add employee", error: err.message });
  }
};

export const editedEmployee = async (req, res) => {
  try {
    const data = await editedEmployeeService({
      userId: req.user.id,
      id: req.params.id,
      body: req.body,
    });
    res
      .status(200)
      .json({ message: "Employee updated successfully!", data });
  } catch (err) {
    const status = err.message === "Employee not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const fetchEmployees = async (req, res) => {
  try {
    const result = await fetchEmployeesService(req);
    res.json(result);
  } catch (err) {
    res
      .json(500)
      .json({ message: "Failed to fetch employees", error: err.message });
  }
};

export const fetchEmployeesById = async (req, res) => {
  try {
    const employee = await fetchEmployeesByIdService({
      userId: req.user.id,
      id: req.params.id,
    });
    res.json(employee);
  } catch (err) {
    const status = err.message === "Employee not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const removeEmployees = async (req, res) => {
  try {
    const deleted = await removeEmployeesService(req.params.id);
    res.json(deleted);
  } catch (err) {
    const status = err.message === "Employee not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};
