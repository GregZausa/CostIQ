import React, { useState } from "react";
import Button from "../components/ui/Button";
import AddEmployeeModal from "../components/modals/AddEmployeeModal";
import EmployeesTable from "../tables/EmployeesTable";

const Employee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const openModal = (id = null) => {
    setEditingId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setEditingId(null);
    setIsModalOpen(false);
  };
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
      {isModalOpen && <AddEmployeeModal closeModal={closeModal}/>}

      <EmployeesTable/>
    </div>
  );
};

export default Employee;
