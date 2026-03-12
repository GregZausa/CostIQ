import React from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import ImageInput from "../ui/ImageInput";
import Button from "../ui/Button";
import { Box, IdCardLanyard, Toolbox } from "lucide-react";
import SelectRawMaterialsModal from "../modals/SelectRawMaterialsModal";
import SelectEmployeeModal from "../modals/SelectEmployeeModal";
import SelectExpensesModal from "../modals/SelectExpensesModal";

const AddProductForm = ({
  form,
  materialQuery,
  employeeQuery,
  expensesQuery,
  handleChange,
  state,
  setOpenModal,
  openModal,
  handleMaterialsConfirm,
  handleExpensesConfirm,
  handleEmployeesConfirm,
  clamped,
  handleOpenModal,
  closeModal,
  handleSubmit
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
          <div className="relative">
            <Button
              label={
                state?.directMaterials?.length
                  ? `Direct Materials ${state.directMaterials.length}`
                  : "Select Direct Materials"
              }
              onClick={() => handleOpenModal("materials")}
              className={"w-full"}
              backgroundAndText={"bg-gray-800 text-white hover:text-gray-400"}
              icon={<Box size={12} />}
            />

            {state?.directMaterials?.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {state.directMaterials.length}
              </span>
            )}
          </div>
          <div className="relative">
            <Button
              label={
                state?.employees?.length
                  ? `Employees ${state.employees.length}`
                  : "Select Employees"
              }
              onClick={() => handleOpenModal("employees")}
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
          <div className="relative">
            <Button
              label={
                state?.otherExpenses?.length
                  ? `Other Expenses ${state.otherExpenses.length}`
                  : "Select Other Expenses"
              }
              onClick={() => handleOpenModal("expenses")}
              className={"w-full"}
              backgroundAndText={"bg-gray-800 text-white hover:text-gray-400"}
              icon={<Toolbox size={12} />}
            />
            {state?.otherExpenses?.length && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {state?.otherExpenses?.length}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            type="submit"
            label={"Save"}
            onClick={(e) => handleSubmit(e)}
            backgroundAndText={"bg-gray-800 hover:bg-blue-500 text-white"}
          />
          <Button
            onClick={closeModal}
            label="Cancel"
            variant="ghost"
            backgroundAndText={
              "bg-white hover:bg-gray-400 text-black border-none"
            }
          />
        </div>
      </form>
      {openModal === "materials" && (
        <SelectRawMaterialsModal
          materialQuery={materialQuery}
          totalSellableUnits={form.state?.totalSellableUnits}
          closeModal={() => setOpenModal(null)}
          onConfirm={handleMaterialsConfirm}
          selected={state?.directMaterials || []}
        />
      )}
      {openModal === "employees" && (
        <SelectEmployeeModal
          employeeQuery={employeeQuery}
          totalSellableUnits={form.state?.totalSellableUnits}
          closeModal={() => setOpenModal(null)}
          onConfirm={handleEmployeesConfirm}
          selected={state?.employees || []}
        />
      )}
      {openModal === "expenses" && (
        <SelectExpensesModal
          expensesQuery={expensesQuery}
          totalSellableUnits={form.state?.totalSellableUnits}
          closeModal={() => setOpenModal(null)}
          onConfirm={handleExpensesConfirm}
          selected={state?.otherExpenses || []}
        />
      )}
    </>
  );
};

export default AddProductForm;
