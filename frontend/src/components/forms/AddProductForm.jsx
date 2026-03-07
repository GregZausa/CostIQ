import React, { useState } from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import ImageInput from "../ui/ImageInput";
import Button from "../ui/Button";
import { Box, IdCardLanyard, Toolbox } from "lucide-react";
import SelectRawMaterialsModal from "../modals/SelectRawMaterialsModal";

const AddProductForm = ({
  handleChange,
  state,
  setOpenModal,
  openModal,
  handleMaterialsConfirm,
  handleExpensesConfirm,
  handleEmployeesConfirm,
  clamped,
}) => {
  return (
    <>
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
              handleChange({
                target: { name: "totalSellableUnits", value: val },
              })
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
              handleChange({
                target: { name: "profitMargin", value: clamped(val) },
              })
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
              handleChange({
                target: { name: "discount", value: clamped(val) },
              })
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
            onChange={(val) => {
              handleChange({
                target: { name: "salesTax", value: clamped(val) },
              });
            }}
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
          <div>
            <Button
              label={
                state?.directMaterials?.length
                  ? `Direct Materials ${state.directMaterials.length}`
                  : "Select Direct Materials"
              }
              onClick={() => setOpenModal("materials")}
              className={"w-full"}
              backgroundAndText={"bg-gray-800 text-white hover:text-gray-400"}
              icon={<Box size={12} />}
            />

            {state?.directMaterials?.length && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {state.directMaterials.length}
              </span>
            )}
          </div>
          <div>
            <Button
              label={
                state?.employees?.length
                  ? `Employees ${state.employees.length}`
                  : "Select Employees"
              }
              onClick={() => setOpenModal("employees")}
              className={"w-full"}
              backgroundAndText={"bg-gray-800 text-white hover:text-gray-400"}
              icon={<IdCardLanyard size={12} />}
            />
            {state?.employees?.length && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {state.employees.length}
              </span>
            )}
          </div>
          <div>
            <Button
              label={
                state?.otherExpenses?.length
                  ? `Other Expenses ${state.otherExpenses}`
                  : "Select Other Expenses"
              }
              onClick={() => setOpenModal("expenses")}
              className={"w-full"}
              backgroundAndText={"bg-gray-800 text-white hover:text-gray-400"}
              icon={<Toolbox size={12} />}
            />
            {state?.otherExpenses?.length && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {state.otherExpenses.length}
              </span>
            )}
          </div>
        </div>
      </form>
      {openModal === "materials" && (
        <SelectRawMaterialsModal
          closeModal={() => setOpenModal(null)}
          onConfirm={handleMaterialsConfirm}
          selected={state?.directMaterials || []}
        />
      )}
    </>
  );
};

export default AddProductForm;
