import {
  deleteRawMaterials,
  getRawMaterials,
  insertRawMaterial,
} from "../models/raw-material.model.js";

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

export const fetchRawMaterials = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const rawMaterials = await getRawMaterials(createdBy);
    res.json(rawMaterials);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch raw materials", error: err });
  }
};

export const removeRawMaterials = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMaterls = await deleteRawMaterials(id);
    if (!deleteMaterls) {
      res.status(404).json({ message: "Raw material not found" });
    }
    res.json(deleteMaterls);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete raw material", error: err });
  }
};
