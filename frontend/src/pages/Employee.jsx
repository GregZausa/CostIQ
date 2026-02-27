import React, { useRef, useState } from "react";
import Button from "../components/ui/Button";
import EmployeeModal from "../components/modals/EmployeeModal";
import EmployeesTable from "../tables/EmployeesTable";
import useEmployee from "../hooks/employees/useEmployee";

const Employee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSuccessRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const { query, actions, form } = useEmployee({
    openModal,
    setIsLoading,
    onSuccess: () => onSuccessRef.current?.(),
  });

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetForm();
    actions.setEditingId(null);
    query.load();
  };

  onSuccessRef.current = closeModal;
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
        <EmployeeModal
          editingId={actions.editingId}
          closeModal={closeModal}
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
