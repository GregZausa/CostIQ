export const getPDFStyles = () => `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 24px; color: #333; }
  h1 { color: #1a1a2e; }
  h2 { margin: 24px 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #1a1a2e; padding-bottom: 12px; }
  .badge { background: #1a1a2e; color: white; padding: 3px 10px; border-radius: 99px; font-size: 10px; }
  .date { color: #888; font-size: 11px; margin-top: 6px; }
  .settings { display: flex; gap: 16px; margin-bottom: 20px; }
  .setting-chip { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 14px; font-size: 11px; color: #475569; }
  .setting-chip span { font-weight: bold; color: #1a1a2e; }
    .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin: 20px 0 10px; }
  .meta { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
  .chip { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 14px; font-size: 11px; color: #475569; }
  .chip span { font-weight: bold; color: #1a1a2e; }
  .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin: 20px 0 10px; }
  .product-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .product-info { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 20px; }
  .product-info h2 { font-size: 15px; color: #1a1a2e; margin-bottom: 8px; font-weight: bold; text-transform: none; letter-spacing: normal; color: #1a1a2e; }
  .product-meta { display: flex; gap: 16px; flex-wrap: wrap; }
  .product-meta-item { font-size: 10px; color: #6b7280; }
  .product-meta-item span { font-weight: bold; color: #1a1a2e; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #1a1a2e; color: white; padding: 8px 10px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
  td { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; font-size: 10px; color: #374151; }
  tr:nth-child(even) td { background: #f8fafc; }
  tr:last-child td { border-bottom: none; }
  .page { page-break-before: always; padding: 24px; }
  .note { margin-top: 16px; font-size: 10px; color: #6b7280; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; }
  .cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 24px; }
  .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; }
  .card-label { font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
  .card-value { font-size: 13px; font-weight: bold; color: #1a1a2e; }
  .card-sub { font-size: 10px; color: #6b7280; margin-top: 2px; }
  .highlight-green { border-color: #16a34a; background: #f0fdf4; }
  .highlight-green .card-value { color: #16a34a; }
  .highlight-red { border-color: #dc2626; background: #fef2f2; }
  .highlight-red .card-value { color: #dc2626; }
  .highlight-blue { border-color: #2563eb; background: #eff6ff; }
  .highlight-blue .card-value { color: #2563eb; }
  .highlight-yellow { border-color: #ca8a04; background: #fefce8; }
  .highlight-yellow .card-value { color: #ca8a04; }
  .breakeven-badge { background: #fef2f2; border: 1px solid #fca5a5; color: #dc2626; padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: bold; }
  .safe-badge { background: #f0fdf4; border: 1px solid #86efac; color: #16a34a; padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: bold; }
  
`;

export const getPDFHeader = (title, subtitle = null) => `
  <div class="header">
    <div>
      <h1>${title}</h1>
      ${subtitle ? `<div style="font-size: 11px; color: #6b7280; margin-top: 4px;">${subtitle}</div>` : ""}
    </div>
    <div style="text-align: right;">
      <div class="badge">CONFIDENTIAL</div>
      <div class="date">Generated: ${new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</div>
    </div>
  </div>
`;

export const wrapHTML = (title, subtitle, body) => `
  <html>
  <head>
    <style>${getPDFStyles()}</style>
  </head>
  <body>
    ${getPDFHeader(title, subtitle)}
    ${body}
  </body>
  </html>
`;
