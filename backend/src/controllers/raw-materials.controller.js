import {
  createRawMaterialService,
  editRawMaterialService,
  fetchRawMaterialsByIdService,
  fetchRawMaterialsService,
  removeRawMaterialsService,
} from "../services/raw-materials.services.js";

export const createRawMaterial = async (req, res) => {
  try {
    const rawMaterial = await createRawMaterialService({
      userId: req.user.id,
      body: req.body,
    });
    res
      .status(201)
      .json({ message: "Raw material added successfully!", rawMaterial });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add raw materials", error: err.message });
  }
};

export const editRawMaterial = async (req, res) => {
  try {
    const data = await editRawMaterialService({
      userId: req.user.id,
      id: req.params.id,
      body: req.body,
    });
    res
      .status(200)
      .json({ message: "Raw Material updated successfully!", data });
  } catch (err) {
    const status = err.message === "Raw material not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const fetchRawMaterials = async (req, res) => {
  try {
    const result = await fetchRawMaterialsService(req);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch raw materials", error: err.message });
  }
};

export const fetchRawMaterialsById = async (req, res) => {
  try {
    const material = await fetchRawMaterialsByIdService({
      userId: req.user.id,
      id: req.params.id,
    });
    res.json(material);
  } catch (err) {
    const status = err.message === "Raw material not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const removeRawMaterials = async (req, res) => {
  try {
    const deleted = await removeRawMaterialsService(req.params.id);
    res.json(deleted);
  } catch (err) {
    const status = err.message === "Raw material not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};
