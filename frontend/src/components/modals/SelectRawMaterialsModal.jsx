import React, { useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import { Box, Search } from "lucide-react";
import TextInput from "../ui/TextInput";
import useRawMaterials from "../../hooks/raw-materials/useRawMaterials";
import Table from "../ui/Table";

const SelectRawMaterialsModal = ({ closeModal, onConfrim, selected = [] }) => {
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState(
    selected.map((s) => ({ ...s })),
  );
  const { query } = useRawMaterials();
  const filtered = query.data.filter((d) =>
    d.material_name.toLowerCase().includes(search.toLowerCase()),
  );
  const isSelected = (raw_material_id) =>
    selectedItems.some((s) => s.raw_material_id === raw_material_id);

  const toggleSelect = (material) => {
    if (isSelected(material.raw_material_id)) {
      setSelectedItems((prev) =>
        prev.filter((s) => s.raw_material_id !== material.raw_material_id),
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { ...material, unitsNeeded: 1, cpr: 0, cpp: 0 },
      ]);
    }
  };
  return (
    <>
      <div
        className="z-60 fixed inset-0 backdrop-blur-sm"
        onClick={closeModal}
      />
      <ModalLayout widthStyle={"w-150"}>
        <div className="flex items-center gap-2 mb-5">
          <Box size={20} className="text-gray-700" />
          <h1 className="text-xl font-bold">Select Direct Materials</h1>
        </div>

        <div className="relative mb-4">
          <TextInput type="search" value={search} onChange={setSearch} />
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-5">
          <div className="bg-gray-50 px-4 border-b border-gray-200">
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Select
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Available Materials
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Number of Units
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Cost Per Unit
              </span>
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <span className="text-center py-10 text-gray-500 italic font-semibold text-sm">
                No materials found
              </span>
            ) : (
              filtered.map((material) => (
                <div
                  key={material.raw_material_id}
                  onClick={() => toggleSelect(material)}
                  className={`flex items-center text-center justify-between px-4 py-2.5 cursor-pointer transition-colors 
                    ${
                      isSelected(material.raw_material_id)
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors 
                        ${
                          isSelected(material.raw_material_id)
                            ? "bg-white border-white"
                            : "border-gray-300"
                        }`}
                  >
                    {isSelected(material.raw_material_id) && (
                      <svg
                        className="w-2.5 h-2.5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M10 3L5 8.5 2 5.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {material.material_name}
                  </span>
                  <span className="text-sm font-medium">
                    {material.units_per_pack} {material.base_unit}
                  </span>
                  <span className={`font-medium`}>
                    ₱{material.cost_per_unit}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        {selectedItems.length > 0 && (
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-5">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Selected ({selectedItems.length})
              </span>
            </div>
            <div className="overflow-x-auto">
              <Table
              />
            </div>
          </div>
        )}
      </ModalLayout>
    </>
  );
};

export default SelectRawMaterialsModal;
