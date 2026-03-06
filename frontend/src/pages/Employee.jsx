import React, { useRef, useState } from "react";
import EmployeeModal from "../components/modals/EmployeeModal";
import EmployeesTable from "../tables/EmployeesTable";
import useEmployee from "../hooks/employees/useEmployee";
import Headers from "../components/layout/Headers";

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
      <Headers
      title={"Employees"}
      buttonLabel={"Add Employees"}
      openModal={openModal}/>
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
