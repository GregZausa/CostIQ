import React from "react";
import AddPositionForm from "../forms/AddPositionForm";
import PositionsTable from "../../tables/PositionsTable";
import ModalLayout from "../layout/ModalLayout";

const PositionModal = ({
  closePositionModal,
  query,
  form,
  actions,
  opened,
}) => {
  return (
    <>
      <div
        className="z-60 fixed inset-0 backdrop-blur-sm"
        onClick={closePositionModal}
      />
      <ModalLayout widthStyle={"w-96"}>
        {opened === "add" ? (
          <div>
            <h1 className="text-xl font-bold mb-4">Add Position</h1>
            <AddPositionForm
              closePositionModal={closePositionModal}
              state={form.state}
              handleChange={form.handleChange}
              handleSubmit={actions.handleSubmit}
            />
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold mb-4">Position List</h1>
            <PositionsTable query={query} actions={actions} />
          </div>
        )}
      </ModalLayout>
    </>
  );
};

export default PositionModal;
