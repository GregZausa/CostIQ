import { getProductsWithProfit } from "../models/product.model.js";
import puppeteer from "puppeteer";
import ExcelJS from "exceljs";

export const fetchProductCostSummaryPDFService = async (req) => {
  const createdBy = req.user.id;
  const products = await getProductsWithProfit(createdBy);

  const summaryRows = products
    .map(
      (p) => `
      <tr>
        <td>${p.product_name}</td>
        <td>₱${Number(p.ingredients_cost).toFixed(2)}</td>
        <td>₱${Number(p.labor_cost).toFixed(2)}</td>
        <td>₱${Number(p.expense_cost).toFixed(2)}</td>
        <td>₱${Number(p.totalCPB).toFixed(2)}</td>
        <td>₱${Number(p.finalPrice).toFixed(2)}</td>
        <td>₱${Number(p.netProfitPerUnit).toFixed(2)}</td>
        <td>${Number(p.roi).toFixed(2)}%</td>
        <td>${p.breakEvenUnits ?? "N/A"}</td>
        <td>₱${p.breakEvenRevenue ? Number(p.breakEvenRevenue).toFixed(2) : "N/A"}</td>
      </tr>`,
    )
    .join("");

  const detailPages = products
    .map(
      (p) => `
      <div class="page">
        <h2>${p.product_name}</h2>
        <table>
          <tr><th>Metric</th><th>Value</th></tr>
          <tr><td>Ingredients Cost</td><td>₱${Number(p.ingredients_cost).toFixed(2)}</td></tr>
          <tr><td>Labor Cost</td><td>₱${Number(p.labor_cost).toFixed(2)}</td></tr>
          <tr><td>Other Expenses</td><td>₱${Number(p.expense_cost).toFixed(2)}</td></tr>
          <tr><td>Total COGS</td><td>₱${Number(p.totalCPB).toFixed(2)}</td></tr>
          <tr><td>Selling Price</td><td>₱${Number(p.finalPrice).toFixed(2)}</td></tr>
          <tr><td>Net Profit / Unit</td><td>₱${Number(p.netProfitPerUnit).toFixed(2)}</td></tr>
          <tr><td>ROI</td><td>${Number(p.roi).toFixed(2)}%</td></tr>
          <tr><td>Break-even Units</td><td>${p.breakEvenUnits ?? "N/A"}</td></tr>
          <tr><td>Break-even Revenue</td><td>₱${p.breakEvenRevenue ? Number(p.breakEvenRevenue).toFixed(2) : "N/A"}</td></tr>
        </table>
      </div>`,
    )
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
          <h1>CostIQ — Product Cost Summary</h1>
          <span class="date">Generated: ${new Date().toLocaleDateString()}</span>
        </div>
        <table>
          <tr>
            <th>Product</th><th>Ingredients</th><th>Labor</th><th>Expenses</th>
            <th>Total COGS</th><th>Selling Price</th><th>Net Profit/Unit</th>
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

export const fetchProductCostSummaryExcelService = async (req) => {
  const createdBy = req.user.id;
  const products = await getProductsWithProfit(createdBy);

  const workbook = new ExcelJS.Workbook();

  const summary = workbook.addWorksheet("Summary");

  summary.columns = [
    { header: "Product", key: "product_name", width: 25 },
    { header: "Ingredients Cost", key: "ingredients_cost", width: 18 },
    { header: "Labor Cost", key: "labor_cost", width: 15 },
    { header: "Other Expenses", key: "expense_cost", width: 18 },
    { header: "Total COGS", key: "totalCPB", width: 15 },
    { header: "Selling Price", key: "finalPrice", width: 15 },
    { header: "Net Profit/Unit", key: "netProfitPerUnit", width: 18 },
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
    const row = summary.addRow(p);

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
      "ingredients_cost",
      "labor_cost",
      "expense_cost",
      "totalCPB",
      "finalPrice",
      "netProfitPerUnit",
      "breakEvenRevenue",
    ];

    moneyKeys.forEach((key) => {
      row.getCell(key).numFmt = '"₱"#,##0.00';
    });

    row.getCell("roi").value = p.roi / 100;
    row.getCell("roi").numFmt = "0.00%";
  });

  products.forEach((p) => {
    const sheet = workbook.addWorksheet(
      p.product_name.substring(0, 31)
    );

    sheet.columns = [
      { header: "Metric", key: "metric", width: 25 },
      { header: "Value", key: "value", width: 25 },
    ];

    const data = [
      ["Ingredients Cost", Number(p.ingredients_cost)],
      ["Labor Cost", Number(p.labor_cost)],
      ["Other Expenses", Number(p.expense_cost)],
      ["Total COGS", Number(p.totalCPB)],
      ["Selling Price", Number(p.finalPrice)],
      ["Net Profit / Unit", Number(p.netProfitPerUnit)],
      ["ROI", Number(p.roi) / 100],
      ["Break-even Units", p.breakEvenUnits ?? "N/A"],
      ["Break-even Revenue", Number(p.breakEvenRevenue || 0)],
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

      if (index === 0) {
        row.font = { bold: true };
      }

      if (index >= 0 && index <= 5) {
        row.getCell(2).numFmt = '"₱"#,##0.00';
      }

      if (index === 6) {
        row.getCell(2).numFmt = "0.00%";
      }
    });

    const header = sheet.getRow(1);
    header.font = { bold: true };
  });

  return await workbook.xlsx.writeBuffer();
};
