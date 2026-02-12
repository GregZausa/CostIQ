import React, { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";

const RawMaterialsTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const moneyFields = ["price_per_pack", "cost_per_unit"];

  const loadRawMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/raw-materials", {
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
      const res = await fetch(
        `http://localhost:5001/api/delete-raw-materials/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();
      console.log("Deleted", result);
    } catch (err) {
      console.error("Failed to delete raw material", err);
    }
  };
  useEffect(() => {
    loadRawMaterials();
  }, []);
  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
};

export default RawMaterialsTable;
