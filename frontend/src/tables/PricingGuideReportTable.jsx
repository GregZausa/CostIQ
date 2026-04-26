// PricingGuideTable.jsx
import { useState } from "react"
import Table from "../components/ui/Table"
import Button from "../components/ui/Button"
import { FileSpreadsheet, FileText } from "lucide-react"
import { downloadPricingGuidePDF, downloadPricingGuideExcel } from "../services/reports.api"
import SelectBox from "../components/ui/SelectBox"

const stepOptions = [
  { label: "5%", value: 5 },
  { label: "10%", value: 10 },
  { label: "20%", value: 20 },
]

const generateScenarios = (product, maxDiscount, step) => {
  const scenarios = []
  const totalCPP = Number(product.totalCPP)
  const totalCPB = Number(product.totalCPB)
  const totalSellableUnits = Number(product.total_sellable_units)
  const profitMargin = Number(product.profit_margin)
  const salesTax = Number(product.sales_tax)

  for (let d = 0; d <= maxDiscount; d += step) {
    const sellingPrice = totalCPP / (1 - profitMargin / 100)
    const discountCost = sellingPrice * (d / 100)
    const discountedPrice = sellingPrice - discountCost
    const profit = discountedPrice - totalCPP
    const tax = discountedPrice * (salesTax / 100)
    const finalPrice = discountedPrice + tax
    const netProfit = profit * totalSellableUnits
    const roi = totalCPB > 0 ? (netProfit / totalCPB) * 100 : 0
    const breakEvenUnits = profit > 0 ? Math.ceil(totalCPB / profit) : null
    const breakEvenRevenue = breakEvenUnits ? breakEvenUnits * discountedPrice : null

    scenarios.push({
      id: `${product.product_id}-${d}`,
      discount: `${d}%`,
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      profitPerUnit: parseFloat(profit.toFixed(2)),
      netProfit: parseFloat(netProfit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      breakEvenUnits: breakEvenUnits ?? "N/A",
      breakEvenRevenue: breakEvenRevenue ? parseFloat(breakEvenRevenue.toFixed(2)) : "N/A",
      isCurrent: d === Number(product.discount),
      isBreakEven: profit <= 0,
    })
  }
  return scenarios
}

const PricingGuideTable = ({ computedProducts }) => {
  const [maxDiscount, setMaxDiscount] = useState(50)
  const [step, setStep] = useState(10)
  const [selectedProductId, setSelectedProductId] = useState(
    computedProducts?.[0]?.product_id ?? null
  )

  const productOptions = computedProducts.map((p) => ({
    label: p.product_name,
    value: p.product_id,
  }))

  const selectedProduct = computedProducts.find(
    (p) => p.product_id === selectedProductId
  )

  const tableData = selectedProduct
    ? generateScenarios(selectedProduct, maxDiscount, step)
    : []

  const reportColumns = [
    {
      key: "discount",
      label: "Discount",
      render: (row) => (
        <span className={row.isCurrent ? "font-bold text-blue-600" : ""}>
          {row.discount} {row.isCurrent ? "⭐" : ""}
        </span>
      ),
    },
    {
      key: "finalPrice",
      label: "Final Price",
      render: (row) => `₱${Number(row.finalPrice).toFixed(2)}`,
    },
    {
      key: "profitPerUnit",
      label: "Profit/Unit",
      render: (row) => {
        const profit = Number(row.profitPerUnit)
        const color = profit <= 0 ? "text-red-600" : "text-green-600"
        return <span className={`font-medium ${color}`}>₱{profit.toFixed(2)}</span>
      },
    },
    {
      key: "netProfit",
      label: "Net Profit",
      render: (row) => `₱${Number(row.netProfit).toFixed(2)}`,
    },
    {
      key: "roi",
      label: "ROI",
      render: (row) => {
        const roi = Number(row.roi)
        const color = roi <= 0 ? "text-red-600" : roi >= 100 ? "text-green-600" : "text-yellow-600"
        return <span className={`font-bold ${color}`}>{roi.toFixed(2)}%</span>
      },
    },
    {
      key: "breakEvenUnits",
      label: "BE Units",
      render: (row) => row.breakEvenUnits,
    },
    {
      key: "breakEvenRevenue",
      label: "BE Revenue",
      render: (row) =>
        row.breakEvenRevenue !== "N/A"
          ? `₱${Number(row.breakEvenRevenue).toFixed(2)}`
          : "N/A",
    },
  ]

  const toolbar = (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-2.5 mt-4">
      <SelectBox
        placeholder="Select Product"
        name="product"
        options={productOptions}
        onChange={setSelectedProductId}
        value={selectedProductId}
      />
      <SelectBox
        placeholder="Step"
        name="step"
        options={stepOptions}
        onChange={(val) => setStep(Number(val))}
        value={step}
      />
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 whitespace-nowrap">Max Discount</span>
        <input
          type="number"
          min={10}
          max={99}
          value={maxDiscount}
          onChange={(e) => setMaxDiscount(Number(e.target.value))}
          className="w-16 text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <Button
        label="Export to PDF"
        onClick={() => downloadPricingGuidePDF(maxDiscount, step, selectedProductId)}
        variant="danger"
        icon={<FileText size={16} />}
      />
      <Button
        label="Export to Excel"
        onClick={() => downloadPricingGuideExcel(maxDiscount, step, selectedProductId)}
        variant="excel"
        icon={<FileSpreadsheet size={16} />}
      />
    </div>
  )

  return (
    <Table
      columns={reportColumns}
      data={tableData}
      toolbar={toolbar}
      text="Select a product to view pricing scenarios."
    />
  )
}

export default PricingGuideTable