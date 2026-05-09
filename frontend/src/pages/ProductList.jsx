import React from "react";
import useProducts from "../hooks/products/useProducts";
import Headers from "../components/layout/Headers";
import ProductsTable from "../tables/ProductsTable";
import { ShoppingBagIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ProductList = () => {
  const { query, actions } = useProducts();
  const { isDark } = useTheme();
  return (
    <div>
      <Headers
        icon={<ShoppingBagIcon size={20} className="text-indigo-500" />}
        subTitle="Placeholder subtitle"
        isDark={isDark}
        title="Product List"
      />
      <ProductsTable query={query} actions={actions} />
    </div>
  );
};

export default ProductList;
