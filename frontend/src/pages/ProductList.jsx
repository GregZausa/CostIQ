import React, { useState } from "react";
import useProducts from "../hooks/products/useProducts";
import Headers from "../components/layout/Headers";
import ProductsTable from "../tables/ProductsTable";
import ProductsModal from "../components/modals/ProductsModal";
import { ShoppingBagIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import useEmployee from "../hooks/employees/useEmployee";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";

const ProductList = () => {
  const { query, actions, form } = useProducts();
  const { isDark } = useTheme();
  const { query: materialQuery } = useRawMaterials();
  const { query: employeeQuery } = useEmployee();
  const { query: expensesQuery } = useOtherExpenses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleEdit = async (id) => {
    await actions.handleEdit(id);
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  return (
    <div>
      <Headers
        icon={<ShoppingBagIcon size={20} className="text-indigo-500" />}
        subTitle="View and organize your product business data."
        isDark={isDark}
        title="Product List"
      />
      <ProductsTable query={query} actions={{ ...actions, handleEdit }} />
      {isModalOpen && (
        <ProductsModal
          closeModal={handleClose}
          form={form}
          actions={{
            ...actions,
            handleSubmit: editingId
              ? (e) => actions.handleUpdate(e, editingId).then(handleClose)
              : actions.handleSubmit,
          }}
          editingId={editingId}
          materialQuery={materialQuery}
          employeeQuery={employeeQuery}
          expensesQuery={expensesQuery}
        />
      )}
    </div>
  );
};

export default ProductList;
