import { getPackUnits } from "../models/unit.model.js"

export const fetchPackUnits = async (req, res) => {
    try {
        const units = await getPackUnits();
        res.json(units);
    }catch(err) {
        res.status(500).json({message: "Failed to fetch units", error:err});
    }
};