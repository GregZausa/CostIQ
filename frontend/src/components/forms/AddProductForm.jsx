import React from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import ImageInput from "../ui/ImageInput";
import Button from "../ui/Button";
import { Box, IdCardLanyard, Plus, Toolbox } from "lucide-react";

const AddProductForm = ({ handleChange, state }) => {
  return (
    <form className="space-y-4">
      <FloatingLabelInput
        onChange={(val) =>
          handleChange({ target: { name: "productName", value: val } })
        }
        name="productName"
        type="text"
        value={state?.productName}
        label="Product Name"
      />
      <ImageInput
        onChange={(val) =>
          handleChange({ target: { name: "productImage", value: val } })
        }
        name="productImage"
        label="Product Image"
        maxSizeMB={5}
        value={state?.productImage}
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        <FloatingLabelInput
          onChange={(val) =>
            handleChange({ target: { name: "totalInput", value: val } })
          }
          name="totalInput"
          type="number"
          label="Total Input"
          value={state?.totalInput}
        />
        <FloatingLabelInput
          onChange={(val) =>
            handleChange({ target: { name: "unitsPerProduct", value: val } })
          }
          name="unitsPerProduct"
          type="number"
          label="Units Per Product"
          value={state?.unitsPerProduct}
        />
        <FloatingLabelInput
          onChange={(val) =>
            handleChange({ target: { name: "totalSellableUnits", value: val } })
          }
          name="totalSellableUnits"
          type="number"
          label="Total Sellable Units"
          value={state?.totalSellableUnits}
          readOnly
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        <FloatingLabelInput
          onChange={(val) =>
            handleChange({ target: { name: "profitMargin", value: val } })
          }
          name="profitMargin"
          type="number"
          label="Profit Margin"
          min={0}
          max={100}
          step={0.01}
          suffix="%"
          value={state?.profitMargin}
        />
        <FloatingLabelInput
          onChange={(val) =>
            handleChange({ target: { name: "discount", value: val } })
          }
          name="discount"
          type="number"
          label="Discount"
          min={0}
          max={100}
          step={0.01}
          suffix="%"
          value={state?.discount}
        />
        <FloatingLabelInput
          onChange={(val) =>
            handleChange({ target: { name: "salesTax", value: val } })
          }
          name="salesTax"
          type="number"
          label="Sales Tax"
          min={0}
          max={100}
          step={0.01}
          suffix="%"
          value={state?.salesTax}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        <Button
          label="Select Direct Materials"
          className={"w-full"}
          backgroundAndText={"bg-gray-800 text-white hover:text-gray-400"}
          icon={<Box size={12} />}
        />
        <Button
          label="Select Employees"
          className={"w-full"}
          backgroundAndText={"bg-gray-800 text-white hover:text-gray-400"}
          icon={<IdCardLanyard size={12} />}
        />
        <Button
          label="Select Other Expenses"
          className={"w-full"}
          backgroundAndText={"bg-gray-800 text-white hover:text-gray-400"}
          icon={<Toolbox size={12} />}
        />
      </div>
    </form>
  );
};

export default AddProductForm;
