import React from "react";
import AddPositionForm from "../forms/AddPositionForm";
import PositionsTable from "../../tables/PositionsTable";

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
      <div
        className="fixed top-1/2 left-1/2 z-60 w-96 max-w-full bg-white/80 border border-white/20 rounded-xl 
                      shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-6 hover:shadow-2xl hover:scale-102 transition-all
                      duration-300 ease-in-out text-black"
      >
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
            <h1>Position List</h1>
            <PositionsTable query={query} actions={actions} />
          </div>
        )}
      </div>
    </>
  );
};

export default PositionModal;
