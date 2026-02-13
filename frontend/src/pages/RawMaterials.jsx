import React, { useState } from "react";
import Button from "../components/ui/Button";
import AddRawMaterialModal from "../components/modals/AddRawMaterialModal";
import toast from "react-hot-toast";
import RawMaterialsTable from "../tables/RawMaterialsTable";

const RawMaterials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveRawMaterial = (data) => {
    console.log("New Raw Material Added", data);
    toast.success("Raw Material Added!");
  };

  return (
    <div>
      <div className="flex items-center text-center justify-between">
        <h1 className="font-bold text-2xl">Raw Materials</h1>
        <Button
          label="Add Raw Materials"
          onClick={openModal}
          backgroundAndText={"bg-gray-800 text-white"}
        />
      </div>
      {isModalOpen && (
        <AddRawMaterialModal closeModal={closeModal} onSave={saveRawMaterial} />
      )}
      <div>
        <div className="shrink-0 ">
          <div className="grid md:grid-cols-1 gap-2.5">
          </div>
        </div>
        <RawMaterialsTable />
      </div>
    </div>
  );
};

export default RawMaterials;
