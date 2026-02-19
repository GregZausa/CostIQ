import React, { useState } from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import Button from "../ui/Button";

const AddOtherExpensesForm = ({ closeModal, handleSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form className="space-y-4">
      <FloatingLabelInput
        label="Category Name"
        name="categoryName"
        type="text"
      />
      <FloatingLabelInput label="Quantity" name="quantity" type="number" />
      <FloatingLabelInput label="Cost" name="cost" type="number" />
      <div className="flex justify-end space-x-4">
        <Button
          label={isLoading ? "Saving" : "Save"}
          onClick={() => {
            handleSubmit();
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

export default AddOtherExpensesForm;
