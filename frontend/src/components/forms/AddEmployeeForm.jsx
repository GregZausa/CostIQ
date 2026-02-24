import React, { useState } from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import Button from "../ui/Button";
import SelectBox from "../ui/SelectBox";

const AddEmployeeForm = ({
  closeModal,
  state,
  handleChange,
  handleSubmit,
  isLoading,
  setIsLoading,
  positionOptions,
  openPositionModal,
}) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-2">
        <FloatingLabelInput
          onChange={(val) =>
            handleChange({ target: { name: "employeeLastName", value: val } })
          }
          name="employeeLastName"
          type="text"
          value={state.employeeLastName}
          label="Last Name"
        />
        <FloatingLabelInput
          onChange={(val) =>
            handleChange({ target: { name: "employeeFirstName", value: val } })
          }
          name="employeeFirstName"
          type="text"
          value={state.employeeFirstName}
          label="First Name"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <SelectBox
          onChange={(val) =>
            handleChange({ target: { name: "position", value: val } })
          }
          name="position"
          placeholder="Select Position"
          value={state.position}
          options={positionOptions}
        />
        <Button
          type="button"
          label={"Add Position"}
          backgroundAndText={"bg-gray-800 text-white hover:text-gray-400"}
          onClick={() => openPositionModal()}
        />
      </div>

      <FloatingLabelInput
        onChange={(val) => {
          handleChange({ target: { name: "ratePerHr", value: val } });
        }}
        name="ratePerHr"
        type="number"
        label="Rate per hour"
        value={state.ratePerHr}
      />
      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          label={isLoading ? "Saving" : "Save"}
          onClick={() => {
            handleSubmit;
            setIsLoading(!isLoading);
          }}
          backgroundAndText={"bg-blue-700 hover:bg-blue-500 text-white"}
        />
        <Button
          onClick={closeModal}
          label="Cancel"
          backgroundAndText={
            "bg-white hover:bg-gray-400 text-black border-none"
          }
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default AddEmployeeForm;
