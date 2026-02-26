import {
  deletePositions,
  getPositions,
  insertPosition,
} from "../models/position.model.js";

export const createPosition = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const { position_name, default_rate_per_hr } = req.body;

    const position = await insertPosition({
      position_name,
      default_rate_per_hr,
      created_by: createdBy,
    });
    res.status(201).json({ message: "Position added successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add position", error: err.message });
  }
};

export const fetchPositions = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const positions = await getPositions(createdBy);
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch position", error: err });
  }
};

export const removePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const position = await deletePositions(id);
    if (!position) {
      res.status(404).json({ message: "Position not found" });
    }
    res.json(position);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete position", error: err.message });
  }
};
