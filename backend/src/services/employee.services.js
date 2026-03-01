import {
  deleteEmployee,
  getEmployees,
  getEmployeesById,
  getEmployeesCount,
  insertEmployee,
  updateEmployee,
} from "../models/employee.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const createEmployeeService = async ({userId, body}) => {
  const { last_name, first_name, position, rate_per_hr } = body;
  return await insertEmployee({
    last_name,
    first_name,
    position,
    rate_per_hr,
    created_by: userId,
  });
};

export const editedEmployeeService = async ({userId, id, body}) => {
  const { last_name, first_name, position, rate_per_hr } = body;

  const updated = await updateEmployee(
    last_name,
    first_name,
    position,
    rate_per_hr,
    userId,
    id,
  );
  if (!updated) throw new Error("Employee not found!");
  return updated;
};

export const fetchEmployeesService = async (req) => {
  const { page, limit, offset, searchTerm, createdBy } =
    getPaginationParams(req);

  const [rows, totalRows] = await Promise.all([
    getEmployees(createdBy, searchTerm, limit, offset),
    getEmployeesCount(createdBy, searchTerm),
  ]);
  const totalPages = Math.ceil(totalRows / limit);

  return { rows, page, totalPages, totalRows };
};

export const fetchEmployeesByIdService = async ({ userId, id }) => {
  const employee = await getEmployeesById(userId, id);
  if (!employee) throw new Error("Employee not found!");
  return employee;
};

export const removeEmployeesService = async (id) => {
  const deleted = await deleteEmployee(id);
  if (!deleted) throw new Error("Employee not found!");
  return deleted;
};
