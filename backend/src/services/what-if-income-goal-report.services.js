import { getProductsWithProfit } from "../models/product.model.js";
import ExcelJS from "exceljs";
import { getBrowser } from "../config/browser.js";

const MILESTONES = [0.25, 0.5, 0.75, 1];

const computeMilestone = (product, goal, batchesPerDay, percentage) => {
  const milestoneGoal = goal * percentage;
  const profitPerUnit = Number(product.netProfitPerUnit);
  const profitPerBatch = Number(product.netProfit);
  const batchSize = Number(product.total_sellable_units);
  const price = Number(product.finalPrice);
  const costPerUnit = Number(product.totalCPP);
  const breakEvenUnits = Number(product.breakEvenUnits ?? 0);

  const batchesNeeded = Math.ceil(milestoneGoal / profitPerBatch);
  const unitsNeeded = batchesNeeded * batchSize;
  const revenueNeeded = unitsNeeded * price;
  const totalCost = unitsNeeded * costPerUnit;
  const beBatches = Math.ceil(breakEvenUnits / batchSize);
  const profitBatches = Math.max(0, batchesNeeded - beBatches);

  let daysNeeded = null;
  let weeksNeeded = null;
  let monthsNeeded = null;
  let profitPerDay = null;
  let profitPerWeek = null;

  if (batchesPerDay > 0) {
    daysNeeded = Math.ceil(batchesNeeded / batchesPerDay);
    weeksNeeded = Math.ceil(daysNeeded / 7);
    monthsNeeded = (daysNeeded / 30).toFixed(1);
    profitPerDay = batchesPerDay * profitPerBatch;
    profitPerWeek = profitPerDay * 7;
  }

  return {
    percentage: `${percentage * 100}%`,
    milestoneGoal,
    batchesNeeded,
    unitsNeeded,
    revenueNeeded,
    totalCost,
    beBatches,
    profitBatches,
    profitPerBatch,
    daysNeeded,
    weeksNeeded,
    monthsNeeded,
    profitPerDay,
    profitPerWeek,
  };
};

const fmt = (n) =>
  n !== null && n !== undefined
    ? "₱" + Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "—";

export const fetchWhatIfPDFService = async (createdBy, productId, goal, batchesPerDay = 0) => {
  const allProducts = await getProductsWithProfit(createdBy);
  const product = allProducts.find((p) => String(p.product_id) === String(productId));
  if (!product) throw new Error("Product not found");

  const milestones = MILESTONES.map((pct) =>
    computeMilestone(product, goal, batchesPerDay, pct)
  );

  const hasTimeline = batchesPerDay > 0;

  const milestoneRows = milestones.map((m, i) => {
    const colors = ["#fefce8", "#fef9c3", "#fef08a", "#f0fdf4"];
    const labelColors = ["#ca8a04", "#ca8a04", "#ca8a04", "#16a34a"];
    return `
      <tr style="background: ${colors[i]};">
        <td style="font-weight: bold; color: ${labelColors[i]};">${m.percentage}</td>
        <td style="font-weight: bold;">${fmt(m.milestoneGoal)}</td>
        <td>${m.batchesNeeded.toLocaleString()}</td>
        <td>${m.unitsNeeded.toLocaleString()}</td>
        <td>${fmt(m.revenueNeeded)}</td>
        <td>${fmt(m.totalCost)}</td>
        <td>${fmt(m.profitPerBatch)}</td>
        ${hasTimeline ? `
          <td>${m.daysNeeded?.toLocaleString() ?? "—"}</td>
          <td>${m.weeksNeeded?.toLocaleString() ?? "—"}</td>
          <td>${m.monthsNeeded ?? "—"} mo</td>
          <td>${fmt(m.profitPerDay)}</td>
          <td>${fmt(m.profitPerWeek)}</td>
        ` : `<td colspan="5" style="text-align:center; color:#94a3b8; font-style:italic;">Add batches/day to see timeline</td>`}
      </tr>`
  }).join("");

  const html = `
    <html>
    <head>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; padding: 24px; color: #333; }
        h1 { color: #1a1a2e; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #1a1a2e; padding-bottom: 12px; }
        .badge { background: #1a1a2e; color: white; padding: 3px 10px; border-radius: 99px; font-size: 10px; }
        .date { color: #888; font-size: 11px; margin-top: 6px; }
        .meta { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .chip { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 14px; font-size: 11px; color: #475569; }
        .chip span { font-weight: bold; color: #1a1a2e; }
        .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin: 20px 0 10px; }
        .product-info { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 20px; }
        .product-info h2 { font-size: 15px; color: #1a1a2e; margin-bottom: 8px; }
        .product-meta { display: flex; gap: 16px; flex-wrap: wrap; }
        .product-meta-item { font-size: 10px; color: #6b7280; }
        .product-meta-item span { font-weight: bold; color: #1a1a2e; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #1a1a2e; color: white; padding: 8px 10px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
        td { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; font-size: 10px; color: #374151; }
        tr:last-child td { border-bottom: none; }
        .note { margin-top: 16px; font-size: 10px; color: #6b7280; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>CostIQ — What-If Income Goal Report</h1>
          <div style="font-size: 11px; color: #6b7280; margin-top: 4px;">Milestone Breakdown</div>
        </div>
        <div style="text-align: right;">
          <div class="badge">CONFIDENTIAL</div>
          <div class="date">Generated: ${new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</div>
        </div>
      </div>

      <div class="meta">
        <div class="chip">Income Goal: <span>${fmt(goal)}</span></div>
        <div class="chip">Batches/Day: <span>${batchesPerDay > 0 ? batchesPerDay : "Not set"}</span></div>
        <div class="chip">Product: <span>${product.product_name}</span></div>
        <div class="chip">Profit/Batch: <span>${fmt(product.netProfit)}</span></div>
      </div>

      <div class="product-info">
        <h2>${product.product_name}</h2>
        <div class="product-meta">
          <div class="product-meta-item">Selling Price: <span>₱${Number(product.finalPrice).toFixed(2)}</span></div>
          <div class="product-meta-item">Cost/Unit: <span>₱${Number(product.totalCPP).toFixed(2)}</span></div>
          <div class="product-meta-item">Profit/Unit: <span>₱${Number(product.netProfitPerUnit).toFixed(2)}</span></div>
          <div class="product-meta-item">Units/Batch: <span>${product.total_sellable_units}</span></div>
          <div class="product-meta-item">Profit/Batch: <span>${fmt(product.netProfit)}</span></div>
          <div class="product-meta-item">Break-even Units: <span>${product.breakEvenUnits ?? "N/A"}</span></div>
          <div class="product-meta-item">ROI: <span>${Number(product.roi).toFixed(2)}%</span></div>
        </div>
      </div>

      <div class="section-title">Milestone Breakdown</div>
      <table>
        <tr>
          <th>Milestone</th>
          <th>Goal</th>
          <th>Batches</th>
          <th>Units</th>
          <th>Revenue</th>
          <th>Total Cost</th>
          <th>Profit/Batch</th>
          ${hasTimeline ? `
            <th>Days</th>
            <th>Weeks</th>
            <th>Months</th>
            <th>Profit/Day</th>
            <th>Profit/Week</th>
          ` : `<th>Timeline</th>`}
        </tr>
        ${milestoneRows}
      </table>

      <div class="note">
        💡 To reach your full goal of <strong>${fmt(goal)}</strong>, you need 
        <strong>${milestones[3].batchesNeeded.toLocaleString()} batches</strong> 
        (${milestones[3].unitsNeeded.toLocaleString()} units).
        ${hasTimeline ? `At <strong>${batchesPerDay} batches/day</strong>, that's <strong>${milestones[3].daysNeeded} days</strong> (~${milestones[3].weeksNeeded} weeks).` : "Add your daily batch capacity to see the timeline."}
      </div>
    </body>
    </html>`;

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
};

export const fetchWhatIfExcelService = async (createdBy, productId, goal, batchesPerDay = 0) => {
  const allProducts = await getProductsWithProfit(createdBy);
  const product = allProducts.find((p) => String(p.product_id) === String(productId));
  if (!product) throw new Error("Product not found");

  const milestones = MILESTONES.map((pct) =>
    computeMilestone(product, goal, batchesPerDay, pct)
  );

  const hasTimeline = batchesPerDay > 0;
  const workbook = new ExcelJS.Workbook();

  // ---- PRODUCT INFO SHEET ----
  const infoSheet = workbook.addWorksheet("Product Info");
  infoSheet.columns = [
    { header: "Metric", key: "metric", width: 25 },
    { header: "Value", key: "value", width: 25 },
  ];

  infoSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  infoSheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F2937" } };
  infoSheet.getRow(1).height = 20;
  infoSheet.getRow(1).eachCell((cell) => {
    cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });

  const infoData = [
    ["Product Name", product.product_name],
    ["Income Goal", Number(goal)],
    ["Batches Per Day", batchesPerDay > 0 ? batchesPerDay : "Not set"],
    ["Selling Price", Number(product.finalPrice)],
    ["Cost Per Unit", Number(product.totalCPP)],
    ["Profit Per Unit", Number(product.netProfitPerUnit)],
    ["Units Per Batch", Number(product.total_sellable_units)],
    ["Profit Per Batch", Number(product.netProfit)],
    ["Break-even Units", product.breakEvenUnits ?? "N/A"],
    ["ROI", Number(product.roi) / 100],
  ];

  infoData.forEach(([metric, value], index) => {
    const row = infoSheet.addRow({ metric, value });
    const isEven = index % 2 === 0;
    row.eachCell((cell) => {
      cell.alignment = { vertical: "middle" };
      cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: isEven ? "FFF9FAFB" : "FFFFFFFF" } };
    });
    if ([1, 3, 4, 5, 7].includes(index)) row.getCell("value").numFmt = '"₱"#,##0.00';
    if (index === 9) row.getCell("value").numFmt = "0.00%";
  });

  // ---- MILESTONES SHEET ----
  const milestoneSheet = workbook.addWorksheet("Milestones");

  const columns = [
    { header: "Milestone", key: "percentage", width: 12 },
    { header: "Income Goal", key: "milestoneGoal", width: 16 },
    { header: "Batches Needed", key: "batchesNeeded", width: 18 },
    { header: "Units Needed", key: "unitsNeeded", width: 16 },
    { header: "Revenue Needed", key: "revenueNeeded", width: 18 },
    { header: "Total Cost", key: "totalCost", width: 15 },
    { header: "Profit/Batch", key: "profitPerBatch", width: 15 },
  ];

  if (hasTimeline) {
    columns.push(
      { header: "Days", key: "daysNeeded", width: 10 },
      { header: "Weeks", key: "weeksNeeded", width: 10 },
      { header: "Months", key: "monthsNeeded", width: 10 },
      { header: "Profit/Day", key: "profitPerDay", width: 15 },
      { header: "Profit/Week", key: "profitPerWeek", width: 15 },
    );
  }

  milestoneSheet.columns = columns;
  milestoneSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  milestoneSheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F2937" } };
  milestoneSheet.getRow(1).height = 20;
  milestoneSheet.getRow(1).eachCell((cell) => {
    cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });

  const milestoneColors = ["FFFEFCE8", "FFFEF9C3", "FFFEF08A", "FFF0FDF4"];

  milestones.forEach((m, index) => {
    const row = milestoneSheet.addRow({
      percentage: m.percentage,
      milestoneGoal: m.milestoneGoal,
      batchesNeeded: m.batchesNeeded,
      unitsNeeded: m.unitsNeeded,
      revenueNeeded: m.revenueNeeded,
      totalCost: m.totalCost,
      profitPerBatch: m.profitPerBatch,
      ...(hasTimeline && {
        daysNeeded: m.daysNeeded,
        weeksNeeded: m.weeksNeeded,
        monthsNeeded: m.monthsNeeded ? Number(m.monthsNeeded) : null,
        profitPerDay: m.profitPerDay,
        profitPerWeek: m.profitPerWeek,
      }),
    });

    row.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: milestoneColors[index] } };
    });

    const moneyKeys = ["milestoneGoal", "revenueNeeded", "totalCost", "profitPerBatch"];
    if (hasTimeline) moneyKeys.push("profitPerDay", "profitPerWeek");
    moneyKeys.forEach((key) => { row.getCell(key).numFmt = '"₱"#,##0.00' });

    // Bold the 100% row
    if (index === 3) row.font = { bold: true }
  });

  return await workbook.xlsx.writeBuffer();
};