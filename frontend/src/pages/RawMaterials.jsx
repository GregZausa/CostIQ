import React, { act, useRef, useState } from "react";
import Button from "../components/ui/Button";
import RawMaterialsModal from "../components/modals/RawMaterialsModal";
import RawMaterialsTable from "../tables/RawMaterialsTable";
import RawMaterialsCard from "../components/cards/RawMaterialsCard";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import { Box, TrendingUp } from "lucide-react";
const RawMaterials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onSuccessRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const { totalRawMaterials, query, actions, form, mostExpensiveMaterial } =
    useRawMaterials({
      openModal,
      setIsLoading,
      onSuccess: () => onSuccessRef.current?.(),
    });

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetForm();
    actions.setEditingId(null);
    query.load();
  };

  onSuccessRef.current = closeModal;

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
        <RawMaterialsModal
          editingId={actions.editingId}
          closeModal={closeModal}
          form={form}
          actions={actions}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 shrink-0 py-4 gap-4">
        <RawMaterialsCard
          title={"Total Raw Materials"}
          value={totalRawMaterials}
          description={"All Materials currently registered"}
          icon={<Box size={18} />}
        />
        <RawMaterialsCard
          title={"Highest Cost / Unit"}
          value={
            mostExpensiveMaterial
              ? `₱ ${Number(mostExpensiveMaterial.cost_per_unit).toLocaleString()}`
              : "-"
          }
          description={mostExpensiveMaterial?.material_name}
          icon={<TrendingUp size={18} />}
        />
      </div>
      <div>
        <RawMaterialsTable query={query} actions={actions} />
      </div>
    </div>
  );
};

export default RawMaterials;
