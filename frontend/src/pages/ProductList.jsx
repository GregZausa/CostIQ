import React from 'react'
import useProducts from '../hooks/products/useProducts'
import Headers from '../components/layout/Headers';
import ProductsTable from '../tables/ProductsTable';

const ProductList = () => {
    const {query, actions} = useProducts();
  return (
    <div>
      <Headers
        title={"Product List"}
      />
      <ProductsTable query={query} actions={actions}/>
    </div>
  )
}

export default ProductList
