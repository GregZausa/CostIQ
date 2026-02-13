import React, { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import { apiUrl } from "../config/apiUrl";
import TextInput from "../components/ui/TextInput";
import SelectBox from "../components/ui/SelectBox";
import useUnits from "../hooks/useUnits";

const RawMaterialsTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { unitOptions } = useUnits();
  const [unit, setUnit] = useState("")

  const moneyFields = ["price_per_pack", "cost_per_unit"];


  const loadRawMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/raw-materials`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();

      const cols = [
        ...result.headers
          .filter((header) => header !== "raw_material_id")
          .map((header) => ({
            key: header,
            label: header
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            render: moneyFields.includes(header)
              ? (row) => `₱ ${Number(row[header]).toFixed(2)}`
              : undefined,
          })),
        {
          render: (row) => (
            <HeadlessUIDropdown row={row} onDelete={handleDelete} />
          ),
        },
      ];
      setColumns(cols);
      setData(result.rows);
    } catch (err) {
      console.error("Failed to load raw material", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/delete-raw-materials/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      console.log("Deleted", result);
      loadRawMaterials();
    } catch (err) {
      console.error("Failed to delete raw material", err);
    }
  };
  useEffect(() => {
    loadRawMaterials();
  }, []);
  const filteredData = data.filter((row) =>
    row.material_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <>
    
      <Table
        columns={columns}
        data={filteredData}
        toolbar={
          <div className="grid md:grid-cols-2 gap-2.5 max-w-4xl mt-4">
            <TextInput
              placeholder="Search for material name..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <SelectBox
            name="packUnit"
            options={unitOptions}
            onChange={(e) => e.target.value}
            value={unit}/>
          </div>
        }
        text={"No raw material found."}
      />
    </>
  );
};

export default RawMaterialsTable;
