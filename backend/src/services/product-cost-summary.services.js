import { getProductsWithProfit } from "../models/product.model.js";
import ExcelJS from "exceljs";
import { getBrowser } from "../config/browser.js";
import { wrapHTML } from "../utils/pdfTemplates.js";

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

const getSummary = (products, type) => {
  const totalProducts = products.length;
  const avgROI =
    products.reduce((sum, p) => sum + Number(p.roi), 0) / totalProducts;
  const avgMargin =
    products.reduce((sum, p) => sum + Number(p.profit_margin), 0) /
    totalProducts;
  const mostProfitable = products.reduce((a, b) =>
    Number(a.roi) > Number(b.roi) ? a : b,
  );
  const leastProfitable = products.reduce((a, b) =>
    Number(a.roi) < Number(b.roi) ? a : b,
  );
  const highestCOGS = products.reduce((a, b) =>
    getValues(a, type).totalCOGS > getValues(b, type).totalCOGS ? a : b,
  );
  const lowestCOGS = products.reduce((a, b) =>
    getValues(a, type).totalCOGS < getValues(b, type).totalCOGS ? a : b,
  );
  const totalIngredients = products.reduce(
    (sum, p) => sum + getValues(p, type).ingredients,
    0,
  );
  const totalLabor = products.reduce(
    (sum, p) => sum + getValues(p, type).labor,
    0,
  );
  const totalExpenses = products.reduce(
    (sum, p) => sum + getValues(p, type).expenses,
    0,
  );
  const totalCOGS = products.reduce(
    (sum, p) => sum + getValues(p, type).totalCOGS,
    0,
  );
  const totalNetProfit = products.reduce(
    (sum, p) => sum + getValues(p, type).netProfit,
    0,
  );

  return {
    totalProducts,
    avgROI,
    avgMargin,
    mostProfitable,
    leastProfitable,
    highestCOGS,
    lowestCOGS,
    totalIngredients,
    totalLabor,
    totalExpenses,
    totalCOGS,
    totalNetProfit,
  };
};

export const fetchProductCostSummaryPDFService = async (
  createdBy,
  type = "batch",
) => {
  const products = await getProductsWithProfit(createdBy);
  const s = getSummary(products, type);
  try {
    const summaryCards = `
    <div class="cards">
      <div class="card">
        <div class="card-label">Total Products</div>
        <div class="card-value">${s.totalProducts}</div>
      </div>
      <div class="card">
        <div class="card-label">Avg ROI</div>
        <div class="card-value">${s.avgROI.toFixed(2)}%</div>
      </div>
      <div class="card">
        <div class="card-label">Avg Profit Margin</div>
        <div class="card-value">${s.avgMargin.toFixed(2)}%</div>
      </div>
      <div class="card">
        <div class="card-label">Total Ingredients</div>
        <div class="card-value">₱${s.totalIngredients.toFixed(2)}</div>
      </div>
      <div class="card">
        <div class="card-label">Total Labor</div>
        <div class="card-value">₱${s.totalLabor.toFixed(2)}</div>
      </div>
      <div class="card">
        <div class="card-label">Total Expenses</div>
        <div class="card-value">₱${s.totalExpenses.toFixed(2)}</div>
      </div>
      <div class="card">
        <div class="card-label">Total COGS</div>
        <div class="card-value">₱${s.totalCOGS.toFixed(2)}</div>
      </div>
      <div class="card">
        <div class="card-label">Total Net Profit</div>
        <div class="card-value">₱${s.totalNetProfit.toFixed(2)}</div>
      </div>
      <div class="card highlight-green">
        <div class="card-label">Most Profitable</div>
        <div class="card-value">${s.mostProfitable.product_name}</div>
        <div class="card-sub">${Number(s.mostProfitable.roi).toFixed(2)}% ROI</div>
      </div>
      <div class="card highlight-red">
        <div class="card-label">Least Profitable</div>
        <div class="card-value">${s.leastProfitable.product_name}</div>
        <div class="card-sub">${Number(s.leastProfitable.roi).toFixed(2)}% ROI</div>
      </div>
      <div class="card highlight-blue">
        <div class="card-label">Highest COGS</div>
        <div class="card-value">${s.highestCOGS.product_name}</div>
        <div class="card-sub">₱${getValues(s.highestCOGS, type).totalCOGS.toFixed(2)}</div>
      </div>
      <div class="card highlight-yellow">
        <div class="card-label">Lowest COGS</div>
        <div class="card-value">${s.lowestCOGS.product_name}</div>
        <div class="card-sub">₱${getValues(s.lowestCOGS, type).totalCOGS.toFixed(2)}</div>
      </div>
    </div>`;

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

    const html = wrapHTML(
      "CostIQ — Product Cost Summary",
      `${type === "batch" ? "Per Batch" : "Per Unit"} View`,
      `<h2>Executive Summary</h2>
      ${summaryCards}

      <h2>Product Cost Breakdown</h2>
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
      ${detailPages}`,
    );

    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });
    await browser.close();
    return pdf;
  } catch (err) {
    console.error("Error: ", err);
  }
};

export const fetchProductCostSummaryExcelService = async (
  createdBy,
  type = "batch",
) => {
  const products = await getProductsWithProfit(createdBy);
  const s = getSummary(products, type);
  const workbook = new ExcelJS.Workbook();

  const summarySheet = workbook.addWorksheet("Executive Summary");
  summarySheet.columns = [
    { header: "Metric", key: "metric", width: 30 },
    { header: "Value", key: "value", width: 30 },
  ];

  summarySheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  summarySheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1F2937" },
  };
  summarySheet.getRow(1).height = 20;
  summarySheet.getRow(1).eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });

  const summaryData = [
    ["Total Products", s.totalProducts],
    ["Average ROI", s.avgROI / 100],
    ["Average Profit Margin", s.avgMargin / 100],
    ["Total Ingredients Cost", s.totalIngredients],
    ["Total Labor Cost", s.totalLabor],
    ["Total Other Expenses", s.totalExpenses],
    ["Total COGS", s.totalCOGS],
    ["Total Net Profit", s.totalNetProfit],
    [
      "Most Profitable Product",
      `${s.mostProfitable.product_name} (${Number(s.mostProfitable.roi).toFixed(2)}% ROI)`,
    ],
    [
      "Least Profitable Product",
      `${s.leastProfitable.product_name} (${Number(s.leastProfitable.roi).toFixed(2)}% ROI)`,
    ],
    [
      "Highest COGS Product",
      `${s.highestCOGS.product_name} (₱${getValues(s.highestCOGS, type).totalCOGS.toFixed(2)})`,
    ],
    [
      "Lowest COGS Product",
      `${s.lowestCOGS.product_name} (₱${getValues(s.lowestCOGS, type).totalCOGS.toFixed(2)})`,
    ],
  ];

  summaryData.forEach(([metric, value], index) => {
    const row = summarySheet.addRow({ metric, value });
    const isEven = index % 2 === 0;
    row.eachCell((cell) => {
      cell.alignment = { vertical: "middle" };
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
    if ([1, 2].includes(index)) row.getCell("value").numFmt = "0.00%";
    if ([3, 4, 5, 6, 7].includes(index))
      row.getCell("value").numFmt = '"₱"#,##0.00';
  });

  const breakdown = workbook.addWorksheet("Product Breakdown");
  const cogsLabel = type === "batch" ? "Total COGS" : "COGS per Unit";
  const netProfitLabel =
    type === "batch" ? "Net Profit/Batch" : "Net Profit/Unit";

  breakdown.columns = [
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

  breakdown.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  breakdown.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1F2937" },
  };
  breakdown.getRow(1).height = 20;
  breakdown.getRow(1).eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });

  products.forEach((p, index) => {
    const v = getValues(p, type);
    const row = breakdown.addRow({
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

    sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1F2937" },
    };
    sheet.getRow(1).eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

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
      if ([0, 1, 2, 3, 4, 5, 8].includes(index))
        row.getCell(2).numFmt = '"₱"#,##0.00';
      if (index === 6) row.getCell(2).numFmt = "0.00%";
    });
  });

  return await workbook.xlsx.writeBuffer();
};
