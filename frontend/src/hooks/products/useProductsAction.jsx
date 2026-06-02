import toast from "react-hot-toast";
import { apiUrl } from "../../config/apiUrl";
import { authFetch } from "../../utils/authFetch";
import {
  deleteProduct,
  fetchSelectedProduct,
} from "../../services/products.api";

export const useProductsAction = ({ form, query }) => {
  const validate = (state) => {
    const errors = {};
    if (!state.productName) errors.productName = "Product name is required!";
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
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message);
        return;
      }
      toast.success("Product added successfully!");
      query.loadPaginatedProducts();
      query.loadProducts();
    } catch {
      toast.error("Failed to add product");
    }
  };

  // ← NEW: populate form with existing product data
  const handleEdit = async (id) => {
    try {
      const result = await fetchSelectedProduct({ selectedProduct: id });
      const p = result?.computedProduct;
      if (!p) return;

      const fields = {
        productName: p.product_name ?? "",
        batchPerDay: p.batch_per_day ?? "",
        productImage: p.product_image ?? "",
        totalInput: p.total_input ?? "",
        unitsPerProduct: p.units_per_product ?? "",
        totalSellableUnits: p.total_sellable_units ?? "",
        profitMargin: p.profit_margin ?? "",
        discount: p.discount ?? "",
        salesTax: p.sales_tax ?? "",
        directMaterials: p.ingredients ?? {},
        employees: p.employees ?? {},
        otherExpenses: p.other_expenses ?? {},
        errors: {},
      };

      Object.entries(fields).forEach(([field, value]) => {
        form.handleChange({ target: { name: field, value } });
      });

      return p;
    } catch (err) {
      toast.error("Failed to load product for editing");
      console.error(err);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const errors = validate(form.state);
    if (Object.keys(errors).length) {
      form.dispatch?.({ type: "SET_ERRORS", errors });
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
      const res = await authFetch(`${apiUrl}/products/${id}`, {
        method: "PUT",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message);
        return;
      }
      toast.success("Product updated successfully!");
      query.loadPaginatedProducts();
      query.loadProducts();
      return;
    } catch {
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteProduct({ id });
      const productName = result.product_name || "Product";
      toast.success(`${productName} deleted successfully!`);
      query.setPage(1);
      query.loadPaginatedProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  return { handleSubmit, handleDelete, handleEdit, handleUpdate };
};
