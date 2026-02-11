import { getRawMaterial, instertRawMaterial } from "../models/raw-material.model.js";

export const createRawMaterial = async (req, res) => {
try {
  const {
    material_name,
    pack_unit,
    base_unit,
    units_per_pack,
    price_per_pack,
  } = req.body;
  const createdBy = req.user.id;

  const rawMaterial = await instertRawMaterial({
    material_name,
    pack_unit,
    base_unit,
    units_per_pack,
    price_per_pack,
    created_by: createdBy,
  });

  res.status(201).json({message: "Raw material added successfully!", rawMaterial});
  }catch(err) {
    res.status(500).json({message: "Failed to add raw material", error:err.message});
  }
};

export const fetchRawMaterials = async (req, res) => {
  try {
    const rawMaterls = await getRawMaterial();
    res.json(rawMaterls);
  }catch(err) {
    res.status(500).json({message:"Failed to fetch raw materials", error: err});
  }
}