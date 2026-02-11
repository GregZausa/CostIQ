import React, { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";


const RawMaterialsTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const loadRawMaterials = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/raw-materials");
      const result = await res.json();

      const cols = [
        ...result.headers.map((header) => ({
          key: header,
          label: header
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        })),
        {
          render: (row) => (
            <HeadlessUIDropdown
            row={row}/>
          ),
        },
      ];
      setColumns(cols);
      setData(result.rows);
    } catch (err) {
      console.error("Failed to load raw materials", err);
    }
  };
  useEffect(() => {
    loadRawMaterials();
  }, []);
  return <Table columns={columns} data={data} />;
};

export default RawMaterialsTable;
