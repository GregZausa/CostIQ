import { getProductsWithProfit } from "../models/product.model.js";
import puppeteer from "puppeteer";
import ExcelJS from "exceljs";

const generateScenarios = (product, maxDiscount, step) => {
  const scenarios = [];
  const totalCPP = Number(product.totalCPP);
  const totalCPB = Number(product.totalCPB);
  const totalSellableUnits = Number(product.total_sellable_units);
  const profitMargin = Number(product.profit_margin);
  const salesTax = Number(product.sales_tax);

  for (let d = 0; d <= maxDiscount; d += step) {
    const sellingPrice = totalCPP / (1 - profitMargin / 100);
    const discountCost = sellingPrice * (d / 100);
    const discountedPrice = sellingPrice - discountCost;
    const profit = discountedPrice - totalCPP;
    const tax = discountedPrice * (salesTax / 100);
    const finalPrice = discountedPrice + tax;
    const netProfit = profit * totalSellableUnits;
    const roi = totalCPB > 0 ? (netProfit / totalCPB) * 100 : 0;
    const breakEvenUnits = profit > 0 ? Math.ceil(totalCPB / profit) : null;
    const breakEvenRevenue = breakEvenUnits
      ? breakEvenUnits * discountedPrice
      : null;

    scenarios.push({
      discount: `${d}%`,
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      profitPerUnit: parseFloat(profit.toFixed(2)),
      netProfit: parseFloat(netProfit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      breakEvenUnits: breakEvenUnits ?? "N/A",
      breakEvenRevenue: breakEvenRevenue
        ? parseFloat(breakEvenRevenue.toFixed(2))
        : "N/A",
      isCurrent: d === Number(product.discount),
    });
  }
  return scenarios;
};

export const fetchPricingGuidePDFService = async (
  createdBy,
  maxDiscount = 50,
  step = 10,
  productId = null,
) => {
  const allProducts = await getProductsWithProfit(createdBy);

  const products = productId
    ? allProducts.filter((p) => p.product_id === productId)
    : allProducts;

  const productPages = products
    .map((p) => {
      const scenarios = generateScenarios(p, maxDiscount, step);
      const breakEvenScenario = scenarios.find((s) => s.profitPerUnit <= 0);

      const rows = scenarios
        .map((s) => {
          const isBreakEven = s.profitPerUnit <= 0;
          const isCurrent = s.isCurrent;
          const rowStyle = isCurrent
            ? "background: #eff6ff; font-weight: bold;"
            : isBreakEven
              ? "background: #fef2f2;"
              : "";

          return `
        <tr style="${rowStyle}">
          <td>${s.discount}${isCurrent ? " ⭐" : ""}</td>
          <td>₱${s.finalPrice}</td>
          <td style="color: ${s.profitPerUnit <= 0 ? "#dc2626" : "#16a34a"}">₱${s.profitPerUnit}</td>
          <td>₱${s.netProfit}</td>
          <td style="color: ${s.roi <= 0 ? "#dc2626" : s.roi >= 100 ? "#16a34a" : "#ca8a04"}; font-weight: bold;">${s.roi}%</td>
          <td>${s.breakEvenUnits}</td>
          <td>${s.breakEvenRevenue !== "N/A" ? `₱${s.breakEvenRevenue}` : "N/A"}</td>
        </tr>`;
        })
        .join("");

      return `
      <div class="page">
        <div class="product-header">
          <div>
            <h2>${p.product_name}</h2>
            <div class="product-meta">
              Profit Margin: ${Number(p.profit_margin).toFixed(2)}% &nbsp;|&nbsp;
              Sales Tax: ${Number(p.sales_tax).toFixed(2)}% &nbsp;|&nbsp;
              Current Discount: ${Number(p.discount).toFixed(2)}% &nbsp;|&nbsp;
              Selling Price: ₱${Number(p.finalPrice).toFixed(2)}
            </div>
          </div>
          ${breakEvenScenario ? `<div class="breakeven-badge">⚠️ Break-even at ${breakEvenScenario.discount}</div>` : '<div class="safe-badge">✅ All scenarios profitable</div>'}
        </div>
        <table>
          <tr>
            <th>Discount</th>
            <th>Final Price</th>
            <th>Profit/Unit</th>
            <th>Net Profit</th>
            <th>ROI</th>
            <th>BE Units</th>
            <th>BE Revenue</th>
          </tr>
          ${rows}
        </table>
      </div>`;
    })
    .join("");

  const summaryRows = products
    .map((p) => {
      const scenarios = generateScenarios(p, maxDiscount, step);
      const best = scenarios.reduce((a, b) => (a.roi > b.roi ? a : b));
      const current = scenarios.find((s) => s.isCurrent) || scenarios[0];
      return `
      <tr>
        <td>${p.product_name}</td>
        <td>₱${Number(p.finalPrice).toFixed(2)}</td>
        <td>${Number(p.discount).toFixed(2)}%</td>
        <td>₱${current.profitPerUnit}</td>
        <td>${current.roi}%</td>
        <td style="color: #16a34a; font-weight: bold;">${best.discount}</td>
        <td style="color: #16a34a;">₱${best.finalPrice}</td>
        <td style="color: #16a34a;">${best.roi}%</td>
      </tr>`;
    })
    .join("");

  const html = `
    <html>
    <head>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; padding: 24px; color: #333; }
        h1 { color: #1a1a2e; }
        h2 { color: #1a1a2e; font-size: 15px; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #1a1a2e; padding-bottom: 12px; }
        .badge { background: #1a1a2e; color: white; padding: 3px 10px; border-radius: 99px; font-size: 10px; }
        .date { color: #888; font-size: 11px; margin-top: 6px; }
        .settings { display: flex; gap: 16px; margin-bottom: 20px; }
        .setting-chip { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 14px; font-size: 11px; color: #475569; }
        .setting-chip span { font-weight: bold; color: #1a1a2e; }
        .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin: 20px 0 10px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #1a1a2e; color: white; padding: 8px 10px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
        td { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; font-size: 10px; color: #374151; }
        tr:last-child td { border-bottom: none; }
        .page { page-break-before: always; padding: 24px 0; }
        .product-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
        .product-meta { font-size: 10px; color: #6b7280; margin-top: 4px; }
        .breakeven-badge { background: #fef2f2; border: 1px solid #fca5a5; color: #dc2626; padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: bold; }
        .safe-badge { background: #f0fdf4; border: 1px solid #86efac; color: #16a34a; padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>CostIQ — Pricing Guide</h1>
        </div>
        <div style="text-align: right;">
          <div class="badge">CONFIDENTIAL</div>
          <div class="date">Generated: ${new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</div>
        </div>
      </div>

      <div class="settings">
        <div class="setting-chip">Max Discount: <span>${maxDiscount}%</span></div>
        <div class="setting-chip">Step: <span>${step}%</span></div>
        <div class="setting-chip">Total Products: <span>${products.length}</span></div>
      </div>

      <div class="section-title">Summary — Best Discount Scenario Per Product</div>
      <table>
        <tr>
          <th>Product</th>
          <th>Base Price</th>
          <th>Current Discount</th>
          <th>Current Profit/Unit</th>
          <th>Current ROI</th>
          <th>Best Discount</th>
          <th>Best Price</th>
          <th>Best ROI</th>
        </tr>
        ${summaryRows}
      </table>

      ${productPages}
    </body>
    </html>`;

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
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
};

export const fetchPricingGuideExcelService = async (
  createdBy,
  maxDiscount = 50,
  step = 10,
  productId = null,
) => {
  const allProducts = await getProductsWithProfit(createdBy);

  const products = productId
    ? allProducts.filter((p) => p.product_id === productId)
    : allProducts;
  const workbook = new ExcelJS.Workbook();

  const summarySheet = workbook.addWorksheet("Summary");
  summarySheet.columns = [
    { header: "Product", key: "product_name", width: 25 },
    { header: "Base Price", key: "basePrice", width: 15 },
    { header: "Current Discount", key: "currentDiscount", width: 18 },
    { header: "Current Profit/Unit", key: "currentProfit", width: 20 },
    { header: "Current ROI", key: "currentROI", width: 15 },
    { header: "Best Discount", key: "bestDiscount", width: 15 },
    { header: "Best Price", key: "bestPrice", width: 15 },
    { header: "Best ROI", key: "bestROI", width: 12 },
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

  products.forEach((p, index) => {
    const scenarios = generateScenarios(p, maxDiscount, step);
    const best = scenarios.reduce((a, b) => (a.roi > b.roi ? a : b));
    const current = scenarios.find((s) => s.isCurrent) || scenarios[0];
    const isEven = index % 2 === 0;

    const row = summarySheet.addRow({
      product_name: p.product_name,
      basePrice: Number(p.finalPrice),
      currentDiscount: Number(p.discount) / 100,
      currentProfit: current.profitPerUnit,
      currentROI: current.roi / 100,
      bestDiscount: best.discount,
      bestPrice: best.finalPrice,
      bestROI: best.roi / 100,
    });

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

    row.getCell("basePrice").numFmt = '"₱"#,##0.00';
    row.getCell("currentDiscount").numFmt = "0.00%";
    row.getCell("currentProfit").numFmt = '"₱"#,##0.00';
    row.getCell("currentROI").numFmt = "0.00%";
    row.getCell("bestPrice").numFmt = '"₱"#,##0.00';
    row.getCell("bestROI").numFmt = "0.00%";

    row.getCell("bestROI").font = { bold: true, color: { argb: "FF16a34a" } };
    row.getCell("bestDiscount").font = {
      bold: true,
      color: { argb: "FF16a34a" },
    };
  });

  products.forEach((p) => {
    const scenarios = generateScenarios(p, maxDiscount, step);
    const sheet = workbook.addWorksheet(p.product_name.substring(0, 31));

    sheet.columns = [
      { header: "Discount", key: "discount", width: 12 },
      { header: "Final Price", key: "finalPrice", width: 15 },
      { header: "Profit/Unit", key: "profitPerUnit", width: 15 },
      { header: "Net Profit", key: "netProfit", width: 15 },
      { header: "ROI %", key: "roi", width: 12 },
      { header: "BE Units", key: "breakEvenUnits", width: 15 },
      { header: "BE Revenue", key: "breakEvenRevenue", width: 18 },
    ];

    sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1F2937" },
    };
    sheet.getRow(1).height = 20;
    sheet.getRow(1).eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    scenarios.forEach((s, index) => {
      const isEven = index % 2 === 0;
      const isBreakEven = s.profitPerUnit <= 0;
      const isCurrent = s.isCurrent;

      const row = sheet.addRow({
        discount: s.discount,
        finalPrice: s.finalPrice,
        profitPerUnit: s.profitPerUnit,
        netProfit: s.netProfit,
        roi: s.roi / 100,
        breakEvenUnits: s.breakEvenUnits,
        breakEvenRevenue:
          s.breakEvenRevenue !== "N/A" ? s.breakEvenRevenue : "N/A",
      });

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
          fgColor: {
            argb: isCurrent
              ? "FFdbeafe"
              : isBreakEven
                ? "FFfee2e2"
                : isEven
                  ? "FFF9FAFB"
                  : "FFFFFFFF",
          },
        };
      });

      row.getCell("finalPrice").numFmt = '"₱"#,##0.00';
      row.getCell("netProfit").numFmt = '"₱"#,##0.00';
      row.getCell("roi").numFmt = "0.00%";

      if (typeof s.breakEvenRevenue === "number") {
        row.getCell("breakEvenRevenue").numFmt = '"₱"#,##0.00';
      }

      row.getCell("profitPerUnit").numFmt = '"₱"#,##0.00';
      row.getCell("profitPerUnit").font = {
        color: { argb: s.profitPerUnit <= 0 ? "FFdc2626" : "FF16a34a" },
      };

      row.getCell("roi").font = {
        bold: isCurrent,
        color: {
          argb:
            s.roi <= 0 ? "FFdc2626" : s.roi >= 100 ? "FF16a34a" : "FFca8a04",
        },
      };

      if (isCurrent) row.font = { bold: true };
    });
  });

  return await workbook.xlsx.writeBuffer();
};
