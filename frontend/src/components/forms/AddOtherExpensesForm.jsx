import React from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import Button from "../ui/Button";
import SelectBox from "../ui/SelectBox";


const AddOtherExpensesForm = ({
  state,
  closeModal,
  handleSubmit,
  handleChange,
  isLoading,
  setIsLoading,
  expenseTypes,
}) => {
  return (
    <form className="space-y-4 " onSubmit={handleSubmit}>
      <FloatingLabelInput
        onChange={(val) =>
          handleChange({ target: { name: "categoryName", value: val } })
        }
        name="categoryName"
        type="text"
        value={state?.categoryName}
        label="Category Name"
      />
      <FloatingLabelInput
        onChange={(val) =>
          handleChange({ target: { name: "cost", value: val } })
        }
        name="cost"
        type="number"
        value={state?.cost}
        label="Cost"
      />
      <SelectBox
        name="expenseType"
        value={state?.expenseType}
        label="Select Expense Type"
        options={expenseTypes}
        onChange={(val) =>
          handleChange({ target: { name: "expenseType", value: val } })
        }
      />
      <div className="flex justify-end space-x-4">
        <Button
        type="submit"
          label={isLoading ? "Saving" : "Save"}
          onClick={() => {
            handleSubmit;
            setIsLoading(!isLoading);
          }}
        />
        <Button
          onClick={closeModal}
          label="Cancel"
          variant="ghost"
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default AddOtherExpensesForm;
