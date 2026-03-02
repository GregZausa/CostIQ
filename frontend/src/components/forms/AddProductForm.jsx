import React from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import ImageInput from "../ui/ImageInput";

const AddProductForm = () => {
  return (
    <form className="space-y-4">
      <FloatingLabelInput name="productName" type="text" label="Product Name" />
      <ImageInput label="Product Image" maxSizeMB={5} />
      <div className="grid md:grid-cols-3 gap-2">
        <FloatingLabelInput
          name="totalInput"
          type="number"
          label="Total Input"
        />
        <FloatingLabelInput
          name="unitsPerProduct"
          type="number"
          label="Units Per Product"
        />
        <FloatingLabelInput
          name="totalSellableUnits"
          type="number"
          label="Total Sellable Units"
          readOnly
        />
      </div>
    </form>
  );
};

export default AddProductForm;
