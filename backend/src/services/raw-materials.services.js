import {
  deleteRawMaterials,
  getMostExpenseiveMaterial,
  getRawMaterials,
  getRawMaterialsById,
  getRawMaterialsCount,
  getRawMaterialsTotalCount,
  insertRawMaterial,
  updateRawMaterial,
} from "../models/raw-material.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const createRawMaterialService = async ({ userId, body }) => {
  const {
    material_name,
    pack_unit,
    base_unit,
    units_per_pack,
    price_per_pack,
  } = body;
  return await insertRawMaterial({
    material_name,
    pack_unit,
    base_unit,
    units_per_pack,
    price_per_pack,
    created_by: userId,
  });
};

export const editRawMaterialService = async ({ userId, id, body }) => {
  const {
    material_name,
    pack_unit,
    base_unit,
    units_per_pack,
    price_per_pack,
  } = body;
  const updated = await updateRawMaterial(
    material_name,
    pack_unit,
    base_unit,
    units_per_pack,
    price_per_pack,
    userId,
    id,
  );
  if (!updated) throw new Error("Raw material not found");
  return updated;
};

export const fetchRawMaterialsService = async (req) => {
  const selectedUnit = req.query.packUnit || "";
  const { page, limit, offset, searchTerm, createdBy } =
    getPaginationParams(req);

  const [rows, totalRows, totalAllRows, mostExpensive] = await Promise.all([
    getRawMaterials(createdBy, searchTerm, selectedUnit, limit, offset),
    getRawMaterialsCount(createdBy, searchTerm, selectedUnit),
    getRawMaterialsTotalCount(createdBy),
    getMostExpenseiveMaterial(createdBy),
  ]);

  const totalPages = Math.ceil(totalAllRows / limit);

  return {
    rows,
    page,
    totalPages,
    totalRows,
    totalAllRows,
    mostExpensive,
  };
};

export const fetchRawMaterialsByIdService = async ({ userId, id }) => {
  const material = await getRawMaterialsById(userId, id);
  if (!material) throw new Error("Raw material not found");
  return material;
};

export const removeRawMaterialsService = async (id) => {
  const deleted = await deleteRawMaterials(id);
  if (!deleted) throw new Error("Raw material not found");
  return deleted;
};
