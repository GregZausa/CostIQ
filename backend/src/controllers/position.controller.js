import { getPositions, insertPosition } from "../models/position.model.js";

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
