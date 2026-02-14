import React, { useState } from "react";
import Button from "../components/ui/Button";
import AddRawMaterialModal from "../components/modals/AddRawMaterialModal";
import toast from "react-hot-toast";
import RawMaterialsTable from "../tables/RawMaterialsTable";
import RawMaterialsCard from "../components/cards/RawMaterialsCard";
import useRawMaterials from "../hooks/useRawMaterials";
import { Box, TrendingUp } from "lucide-react";
const RawMaterials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const openModal = (id = null) => {
    setEditingId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setEditingId(null);
    setIsModalOpen(false);
  };
  const { totalRawMaterials, loadRawMaterials, mostExpensiveMaterial } =
    useRawMaterials(closeModal, openModal);
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
        <AddRawMaterialModal
          closeModal={() => {
            closeModal();
            loadRawMaterials();
          }}
          editingId={editingId}
        />
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 shrink-0 py-4 gap-4">
        <RawMaterialsCard
          title={"Total Raw Materials"}
          value={totalRawMaterials}
          description={"All Materials currently registered"}
          icon={<Box size={18}/>}
        />
        <RawMaterialsCard
          title={"Highest Cost / Unit"}
          value={
            mostExpensiveMaterial
              ? `₱ ${Number(mostExpensiveMaterial.cost_per_unit).toLocaleString()}`
              : "-"
          }
          description={mostExpensiveMaterial?.material_name}
          icon={<TrendingUp size={18}/>}
        />
      </div>
      <div>
        <RawMaterialsTable onEdit={openModal} />
      </div>
    </div>
  );
};

export default RawMaterials;
