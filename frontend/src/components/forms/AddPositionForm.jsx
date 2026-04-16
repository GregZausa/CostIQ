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
          handleChange({ target: { name: "defaultRatePerDay", value: val } })
        }
        name="defaultRatePerDay"
        type="number"
        value={state?.defaultRatePerDay}
        label="Default rate per day"
      />
      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          label={"Save"}
          onClick={(e) => handleSubmit(e)}
        />
        <Button
          onClick={closePositionModal}
          label="Cancel"
          variant="ghost"
        />
      </div>
    </form>
  );
};

export default AddPositionForm;
