import React from 'react'
import Headers from '../components/layout/Headers'
import { useProductsQuery } from '../hooks/products/useProductsQuery'
import ProductCostSummaryTable from '../tables/ProductCostSummaryTable';

const ProductCostSummary = () => {
  const {computedProducts} = useProductsQuery();
  return (
    <div>
      <Headers
        title="Product Cost Summary"
      />

    <ProductCostSummaryTable computedProducts ={computedProducts}/>
    </div>
  )
}

export default ProductCostSummary
