import { getProductsWithProfit } from "../models/product.model.js";
import puppeteer from "puppeteer";
import ExcelJS from "exceljs";

const getValues = (p, type) => ({
  ingredients:
    type === "batch" ? Number(p.ingredients_cost) : Number(p.materialCPP),
  labor: type === "batch" ? Number(p.labor_cost) : Number(p.employeeCPP),
  expenses:
    type === "batch" ? Number(p.expense_cost) : Number(p.otherExpenseCPP),
  totalCOGS: type === "batch" ? Number(p.totalCPB) : Number(p.totalCPP),
  netProfit:
    type === "batch"
      ? Number(p.netProfitPerUnit) * Number(p.total_sellable_units)
      : Number(p.netProfitPerUnit),
  cogsLabel: type === "batch" ? "Total COGS" : "COGS per Unit",
  netProfitLabel: type === "batch" ? "Net Profit/Batch" : "Net Profit/Unit",
});

export const fetchProductCostSummaryPDFService = async (
  createdBy,
  type = "batch",
) => {
  const products = await getProductsWithProfit(createdBy);

  const summaryRows = products
    .map((p) => {
      const v = getValues(p, type);
      return `
      <tr>
        <td>${p.product_name}</td>
        <td>₱${v.ingredients.toFixed(2)}</td>
        <td>₱${v.labor.toFixed(2)}</td>
        <td>₱${v.expenses.toFixed(2)}</td>
        <td>₱${v.totalCOGS.toFixed(2)}</td>
        <td>₱${Number(p.finalPrice).toFixed(2)}</td>
        <td>₱${v.netProfit.toFixed(2)}</td>
        <td>${Number(p.roi).toFixed(2)}%</td>
        <td>${p.breakEvenUnits ?? "N/A"}</td>
        <td>₱${p.breakEvenRevenue ? Number(p.breakEvenRevenue).toFixed(2) : "N/A"}</td>
      </tr>`;
    })
    .join("");

  const detailPages = products
    .map((p) => {
      const v = getValues(p, type);
      return `
      <div class="page">
        <h2>${p.product_name}</h2>
        <table>
          <tr><th>Metric</th><th>Value</th></tr>
          <tr><td>Ingredients Cost</td><td>₱${v.ingredients.toFixed(2)}</td></tr>
          <tr><td>Labor Cost</td><td>₱${v.labor.toFixed(2)}</td></tr>
          <tr><td>Other Expenses</td><td>₱${v.expenses.toFixed(2)}</td></tr>
          <tr><td>${v.cogsLabel}</td><td>₱${v.totalCOGS.toFixed(2)}</td></tr>
          <tr><td>Selling Price</td><td>₱${Number(p.finalPrice).toFixed(2)}</td></tr>
          <tr><td>${v.netProfitLabel}</td><td>₱${v.netProfit.toFixed(2)}</td></tr>
          <tr><td>ROI</td><td>${Number(p.roi).toFixed(2)}%</td></tr>
          <tr><td>Break-even Units</td><td>${p.breakEvenUnits ?? "N/A"}</td></tr>
          <tr><td>Break-even Revenue</td><td>₱${p.breakEvenRevenue ? Number(p.breakEvenRevenue).toFixed(2) : "N/A"}</td></tr>
        </table>
      </div>`;
    })
    .join("");

  const html = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          h1, h2 { color: #1a1a2e; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #1a1a2e; color: white; padding: 8px; text-align: left; font-size: 11px; }
          td { padding: 8px; border-bottom: 1px solid #eee; font-size: 11px; }
          tr:nth-child(even) { background: #f9f9f9; }
          .page { page-break-before: always; padding: 20px; }
          .header { display: flex; justify-content: space-between; align-items: center; }
          .date { color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CostIQ — Product Cost Summary (${type === "batch" ? "Per Batch" : "Per Unit"})</h1>
          <span class="date">Generated: ${new Date().toLocaleDateString()}</span>
        </div>
        <table>
          <tr>
            <th>Product</th><th>Ingredients</th><th>Labor</th><th>Expenses</th>
            <th>${products.length ? getValues(products[0], type).cogsLabel : "Total COGS"}</th>
            <th>Selling Price</th>
            <th>${products.length ? getValues(products[0], type).netProfitLabel : "Net Profit"}</th>
            <th>ROI</th><th>BE Units</th><th>BE Revenue</th>
          </tr>
          ${summaryRows}
        </table>
        ${detailPages}
      </body>
      </html>`;

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
  });
  await browser.close();
  return pdf;
};

export const fetchProductCostSummaryExcelService = async (
  createdBy,
  type = "batch",
) => {
  const products = await getProductsWithProfit(createdBy);
  const workbook = new ExcelJS.Workbook();
  const summary = workbook.addWorksheet("Summary");

  const cogsLabel = type === "batch" ? "Total COGS" : "COGS per Unit";
  const netProfitLabel =
    type === "batch" ? "Net Profit/Batch" : "Net Profit/Unit";

  summary.columns = [
    { header: "Product", key: "product_name", width: 25 },
    { header: "Ingredients Cost", key: "ingredients", width: 18 },
    { header: "Labor Cost", key: "labor", width: 15 },
    { header: "Other Expenses", key: "expenses", width: 18 },
    { header: cogsLabel, key: "totalCOGS", width: 15 },
    { header: "Selling Price", key: "finalPrice", width: 15 },
    { header: netProfitLabel, key: "netProfit", width: 18 },
    { header: "ROI %", key: "roi", width: 10 },
    { header: "Break-even Units", key: "breakEvenUnits", width: 18 },
    { header: "Break-even Revenue", key: "breakEvenRevenue", width: 20 },
  ];

  const headerRow = summary.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };
  headerRow.height = 20;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1F2937" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  products.forEach((p, index) => {
    const v = getValues(p, type);
    const row = summary.addRow({
      product_name: p.product_name,
      ingredients: v.ingredients,
      labor: v.labor,
      expenses: v.expenses,
      totalCOGS: v.totalCOGS,
      finalPrice: Number(p.finalPrice),
      netProfit: v.netProfit,
      roi: Number(p.roi) / 100,
      breakEvenUnits: p.breakEvenUnits ?? "N/A",
      breakEvenRevenue: p.breakEvenRevenue ? Number(p.breakEvenRevenue) : 0,
    });

    const isEven = index % 2 === 0;
    row.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: isEven ? "FFF9FAFB" : "FFFFFFFF" },
      };
    });

    const moneyKeys = [
      "ingredients",
      "labor",
      "expenses",
      "totalCOGS",
      "finalPrice",
      "netProfit",
      "breakEvenRevenue",
    ];
    moneyKeys.forEach((key) => {
      row.getCell(key).numFmt = '"₱"#,##0.00';
    });
    row.getCell("roi").numFmt = "0.00%";
  });

  products.forEach((p) => {
    const v = getValues(p, type);
    const sheet = workbook.addWorksheet(p.product_name.substring(0, 31));
    sheet.columns = [
      { header: "Metric", key: "metric", width: 25 },
      { header: "Value", key: "value", width: 25 },
    ];

    const data = [
      ["Ingredients Cost", v.ingredients],
      ["Labor Cost", v.labor],
      ["Other Expenses", v.expenses],
      [v.cogsLabel, v.totalCOGS],
      ["Selling Price", Number(p.finalPrice)],
      [v.netProfitLabel, v.netProfit],
      ["ROI", Number(p.roi) / 100],
      ["Break-even Units", p.breakEvenUnits ?? "N/A"],
      [
        "Break-even Revenue",
        p.breakEvenRevenue ? Number(p.breakEvenRevenue) : 0,
      ],
    ];

    data.forEach((rowData, index) => {
      const row = sheet.addRow(rowData);
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      if (index >= 0 && index <= 5) row.getCell(2).numFmt = '"₱"#,##0.00';
      if (index === 6) row.getCell(2).numFmt = "0.00%";
    });

    sheet.getRow(1).font = { bold: true };
  });

  return await workbook.xlsx.writeBuffer();
};
