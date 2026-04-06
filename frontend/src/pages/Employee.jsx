import React, { useRef, useState } from "react";
import EmployeeModal from "../components/modals/EmployeeModal";
import EmployeesTable from "../tables/EmployeesTable";
import useEmployee from "../hooks/employees/useEmployee";
import Headers from "../components/layout/Headers";
import HeaderCard from "../components/cards/HeaderCard";
import { Box } from "lucide-react";

const Employee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSuccessRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const { query, actions, form, totalEmployees, mostUsedPosition, mostUsedEmployee, mostPaidEmployee } =
    useEmployee({
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
        openModal={openModal}
      />
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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 shrink-0 py-2 gap-2">
        <HeaderCard
          title="Total Employees"
          value={totalEmployees}
          description="All Materials currently registered"
          icon={<Box size={18} />}
        />
        <HeaderCard
          title="Most used position"
          value={
            mostUsedPosition
              ? `${Number(mostUsedPosition.usage_count).toLocaleString()}`
              : "-"
          }
          description={mostUsedPosition?.position_name}
          icon={<Box size={18} />}
        />
        <HeaderCard
          title="Most used employee"
          value={
            mostUsedPosition
              ? `${Number(mostUsedEmployee?.usage_count).toLocaleString()}`
              : "-"
          }
          description={mostUsedEmployee?.employee_name}
          icon={<Box size={18} />}
        />
        <HeaderCard
          title="Most Paid Employee"
          value={
            mostPaidEmployee
              ? `₱ ${Number(mostPaidEmployee.rate_per_hr).toLocaleString()}`
              : "-"
          }
          description={mostPaidEmployee?.employee_name}
          icon={<Box size={18} />}
        />
      </div>

      <EmployeesTable query={query} actions={actions} />
    </div>
  );
};

export default Employee;
