import {
  deleteRawMaterials,
  getMostExpenseiveMaterial,
  getRawMaterials,
  getRawMaterialsById,
  insertRawMaterial,
  updateRawMaterial,
} from "../models/raw-material.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const createRawMaterial = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const {
      material_name,
      pack_unit,
      base_unit,
      units_per_pack,
      price_per_pack,
    } = req.body;

    const rawMaterial = await insertRawMaterial({
      material_name,
      pack_unit,
      base_unit,
      units_per_pack,
      price_per_pack,
      created_by: createdBy,
    });

    res
      .status(201)
      .json({ message: "Raw material added successfully!", rawMaterial });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add raw material", error: err.message });
  }
};

export const editRawMaterial = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const { id } = req.params;
    const {
      material_name,
      pack_unit,
      base_unit,
      units_per_pack,
      price_per_pack,
    } = req.body;

    const updatedRawMaterial = await updateRawMaterial(
      material_name,
      pack_unit,
      base_unit,
      units_per_pack,
      price_per_pack,
      createdBy,
      id,
    );

    res
      .status(201)
      .json({
        message: "Raw material updated successfully!",
        data: updatedRawMaterial,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update raw material", error: err.message });
  }
};

export const fetchRawMaterials = async (req, res) => {
  try {
    const selectedUnit = req.query.packUnit || "";
    const { page, limit, offset, searchTerm, createdBy } =
      getPaginationParams(req);
    const rawMaterials = await getRawMaterials(
      createdBy,
      searchTerm,
      selectedUnit,
      limit,
      offset,
      page,
    );

    const mostExpensive = await getMostExpenseiveMaterial(createdBy);
    res.json({...rawMaterials, mostExpensive});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch raw materials", error: err });
  }
};

export const fetchRawMaterialsById = async (req, res) => {
  try {
    const { id } = req.params;
    const createdBy = req.user.id;
    const rawMaterialById = await getRawMaterialsById(createdBy, id);

    if (!rawMaterialById) {
      return res.status(404).json({ message: "Raw Material not found" });
    }
    res.json(rawMaterialById);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete raw material", error: err });
  }
};

export const removeRawMaterials = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMaterials = await deleteRawMaterials(id);
    if (!deleteMaterials) {
      return res.status(404).json({ message: "Raw material not found" });
    }
    res.json(deleteMaterials);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete raw material", error: err });
  }
};
