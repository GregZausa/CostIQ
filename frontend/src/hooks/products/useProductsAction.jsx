import toast from "react-hot-toast";
import { apiUrl } from "../../config/apiUrl";
import { authFetch } from "../../utils/authFetch";
import {} from "react";
import { deleteProduct } from "../../services/products.api";

export const useProductsAction = ({ form, query }) => {
  const validate = (state) => {
    const errors = {};
    if (!state.productName) errors.prductName = "Product name is requried!";
    if (!state.batchPerDay) errors.batchPerDay = "Batch per day must be > 0";
    if (!state.totalInput) errors.totalInput = "Total input must be > 0";
    if (!state.unitsPerProduct)
      errors.unitsPerProduct = "Units per product must be > 0";
    if (!state.profitMargin) errors.profitMargin = "Profit margin must be > 0%";
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(form.state);
    if (Object.keys(errors).length) {
      form.dispatch({ type: "SET_ERRORS", errors });
      Object.values(errors).forEach((msg) => toast.error(msg));
      return;
    }
    const formData = new FormData();
    formData.append("product_name", form.state.productName);
    formData.append("batch_per_day", form.state.batchPerDay);
    formData.append("product_image", form.state.productImage);
    formData.append("total_input", form.state.totalInput);
    formData.append("units_per_product", form.state.unitsPerProduct);
    formData.append("total_sellable_units", form.state.totalSellableUnits);
    formData.append("profit_margin", form.state.profitMargin);
    formData.append("discount", form.state.discount);
    formData.append("sales_tax", form.state.salesTax);
    formData.append(
      "direct_materials",
      JSON.stringify(form.state.directMaterials),
    );
    formData.append("employees", JSON.stringify(form.state.employees));
    formData.append("other_expenses", JSON.stringify(form.state.otherExpenses));

    try {
      const res = await authFetch(`${apiUrl}/products`, {
        method: "POST",
        body: formData,
      });
      const result = res.json();
      if (!res.ok) {
        toast.error(result.message);
        return;
      }
      toast.success("Product added successfully!");
    } catch (err) {
      toast.error("Failed to add product");
    }
  };
  const handleDelete = async (id) => {
    try {
      const result = await deleteProduct({ id });
      const productName = `${result.product_name}` || "Employee";
      toast.success(`${productName}'s Product deleted successfully!`);
      query.setPage(1);
      query.loadPaginatedProducts();
      return;
    } catch (err) {
      console.error("Failed to delete employee", err);
    }
  };

  return {
    handleSubmit,
    handleDelete,
  };
};
