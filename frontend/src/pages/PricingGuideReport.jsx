import { useState } from "react"
import Headers from "../components/layout/Headers"
import { useProductsQuery } from "../hooks/products/useProductsQuery"
import PricingGuideTable from "../tables/PricingGuideReportTable"

const PricingGuide = () => {
  const { computedProducts } = useProductsQuery()

  return (
    <div className="space-y-4">
      <Headers title="Pricing Guide" />
      <PricingGuideTable
        computedProducts={computedProducts}
      />
    </div>
  )
}

export default PricingGuide