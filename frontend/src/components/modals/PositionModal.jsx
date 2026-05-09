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
      <ModalLayout
        widthStyle={"w-96"}
        header={opened === "add" ? "Position" : "Position List"}
      >
        {opened === "add" ? (
          <div>
            <AddPositionForm
              closePositionModal={closePositionModal}
              state={form.state}
              handleChange={form.handleChange}
              handleSubmit={actions.handleSubmit}
            />
          </div>
        ) : (
          <div>
            <PositionsTable query={query} actions={actions} />
          </div>
        )}
      </ModalLayout>
    </>
  );
};

export default PositionModal;
