import React from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import Button from "../ui/Button";

const AddPositionForm = ({
  closePositionModal,
  state,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form className="space-y-4">
      <FloatingLabelInput
        onChange={(val) =>
          handleChange({ target: { name: "positionName", value: val } })
        }
        name="positionName"
        type="text"
        value={state?.positionName}
        label="Position Name"
      />
      <FloatingLabelInput
        onChange={(val) =>
          handleChange({ target: { name: "defaultRatePerHr", value: val } })
        }
        name="defaultRatePerHr"
        type="number"
        value={state?.defaultRatePerHr}
        label="Default rate per hr"
      />
      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          label={"Save"}
          onClick={(e) => handleSubmit(e)}
          backgroundAndText={"bg-gray-800 hover:bg-blue-500 text-white"}
        />
        <Button
          onClick={closePositionModal}
          label="Cancel"
          variant="ghost"
          backgroundAndText={
            "bg-white hover:bg-gray-400 text-black border-none"
          }
        />
      </div>
    </form>
  );
};

export default AddPositionForm;
