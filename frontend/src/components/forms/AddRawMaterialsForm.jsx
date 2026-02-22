import Button from "../ui/Button";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import SelectBox from "../ui/SelectBox";

const AddRawMaterialsForm = ({ state, handleChange, unitsPerPackEditable, unitOptions, handleSubmit, closeModal, isLoading}) => {

  return (
    <form className="space-y-4">
   
      <FloatingLabelInput
        onChange={(val) =>
          handleChange({ target: { name: "materialName", value: val } })
        }
        name="materialName"
        type="text"
        value={state?.materialName || ""}
        label="Material Name"
      />
      <SelectBox
        name="packUnit"
        value={state?.packUnit}
        label="Select Pack Unit"
        options={unitOptions}
        onChange={(val) =>
          handleChange({ target: { name: "packUnit", value: val } })
        }
      />
      <FloatingLabelInput
        name="baseUnit"
        type="text"
        value={state?.baseUnit || ""}
        label="Base Unit"
        readOnly={true}
      />
      <FloatingLabelInput
        onChange={(val) =>
          handleChange({ target: { name: "unitsPerPack", value: val } })
        }
        name="unitsPerPack"
        type="number"
        value={state?.unitsPerPack}
        label="Units Per Pack"
        readOnly={!unitsPerPackEditable}
      />
      <FloatingLabelInput
        onChange={(val) =>
          handleChange({ target: { name: "pricePerPack", value: val } })
        }
        name="pricePerPack"
        type="number"
        value={state?.pricePerPack || ""}
        label="Price Per Pack"
      />
      <FloatingLabelInput
        onChange={(val) =>
          handleChange({ target: { name: "costPerUnit", value: val } })
        }
        name="costPerUnit"
        type="text"
        value={`${state?.costPerUnit} PHP / ${state?.baseUnit}` || ""}
        label="Cost Per Unit"
        readOnly={true}
      />
      <div className="flex justify-end space-x-4">
        <Button
          onClick={(e) => handleSubmit(e)}
          label={isLoading ? "Saving" : "Save"}
          backgroundAndText={"bg-blue-700 hover:bg-blue-500 text-white"}
          disabled={isLoading}
        />
        <Button
        type="button"
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

export default AddRawMaterialsForm;
