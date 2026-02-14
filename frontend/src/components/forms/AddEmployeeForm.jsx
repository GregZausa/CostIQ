import React, { useState } from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import Button from "../ui/Button";

const AddEmployeeForm = ({closeModal}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form className="space-y-4">
      <FloatingLabelInput
        name="employeeLastName"
        type="text"
        label="Last Name"
      />
      <FloatingLabelInput
        name="employeeFirstName"
        type="text"
        label="First Name"
      />
      <FloatingLabelInput
        name="ratePerHr"
        type="number"
        label="Rate per hour"
      />
      <div className="flex justify-end space-x-4">
        <Button
          label={isLoading ? "Saving" : "Save"}
          onClick={() => {
            (handleSubmit(), setIsLoading(true));
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
