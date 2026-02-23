import React, { useState } from "react";
import Button from "../components/ui/Button";
import AddEmployeeModal from "../components/modals/AddEmployeeModal";
import EmployeesTable from "../tables/EmployeesTable";
import useEmployee from "../hooks/employees/useEmployee";

const Employee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { query, actions, form } = useEmployee({
    closeModal,
    openModal,
    setIsLoading,
  });
  return (
    <div>
      <div className="flex items-center text-center justify-between">
        <h1 className="font-bold text-2xl">Employees</h1>
        <Button
          label="Add Employees"
          onClick={openModal}
          backgroundAndText={"bg-gray-800 text-white"}
        />
      </div>
      {isModalOpen && (
        <AddEmployeeModal
          closeModal={() => {
            closeModal();
            query.load();
          }}
          form={form}
          actions={actions}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}

      <EmployeesTable query={query} actions={actions} />
    </div>
  );
};

export default Employee;
