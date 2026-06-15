import { GoogleGenAI } from "@google/genai";
import {
  getSalesSummary,
  getProductSalesSummary,
  getWeeklySalesHistory,
} from "../models/sales.model.js";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
let AVAILABLE_MODELS = [];

const loadModels = async () => {
  const res = await genAI.models.list();
  AVAILABLE_MODELS = res.pageInternal
    .map((m) => m.name.replace("models/", ""))
    .filter(
      (name) =>
        name.includes("flash") &&
        !name.includes("preview") &&
        !name.includes("image") &&
        !name.includes("tts"),
    );
  console.log("Usable models:", AVAILABLE_MODELS);
};

const isRetryableError = (err) => {
  const msg = err?.message?.toLowerCase() ?? "";
  const status = err?.status ?? err?.httpStatus;
  return (
    status === 429 ||
    status === 503 ||
    status === 500 ||
    status === 502 ||
    status === 504 ||
    msg.includes("resource exhausted") ||
    msg.includes("rate limit") ||
    msg.includes("too many requests")
  );
};

// ── existing prompts unchanged ──
const marketPriceAnalysisPrompt = (product) => `
You are a business pricing analyst in the Philippines. 

A small business owner has a product with the following details:
- Product Name: ${product.product_name}
- Their Final Selling Price: ₱${Number(product.finalPrice).toFixed(2)}
- Cost Per Unit (COGS): ₱${Number(product.totalCPP).toFixed(2)}
- Profit Per Unit: ₱${Number(product.netProfitPerUnit).toFixed(2)}
- ROI: ${Number(product.roi).toFixed(2)}%
- Profit Margin: ${Number(product.profit_margin).toFixed(2)}%

Based on your knowledge of the Philippine market:
1. What is the typical/average market price range for "${product.product_name}" in the Philippines?
2. How does their selling price of ₱${Number(product.finalPrice).toFixed(2)} compare to the market?
3. Is their pricing competitive, too high, or too low?
4. Give a short actionable recommendation (1-2 sentences max).

Respond ONLY in this exact JSON format, no markdown, no extra text:
{
  "marketPriceMin": <number>,
  "marketPriceMax": <number>,
  "marketAverage": <number>,
  "comparison": "competitive" | "too_high" | "too_low",
  "comparisonText": "<short explanation>",
  "recommendation": "<1-2 sentence actionable advice>",
  "modelUsed": "<model name>"
}
`;

const costOptimizationPrompt = (product) => `
You are an expert business cost optimization consultant in the Philippines.

A small business owner has this product:
- Product Name: ${product.product_name}
- Ingredients/Materials Cost: ₱${Number(product.ingredients_cost).toFixed(2)} per batch
- Labor Cost: ₱${Number(product.labor_cost).toFixed(2)} per batch
- Other Expenses: ₱${Number(product.expense_cost).toFixed(2)} per batch
- Total COGS per Batch: ₱${Number(product.totalCPB).toFixed(2)}
- Total COGS per Unit: ₱${Number(product.totalCPP).toFixed(2)}
- Selling Price: ₱${Number(product.finalPrice).toFixed(2)}
- Profit Margin: ${Number(product.profit_margin).toFixed(2)}%
- ROI: ${Number(product.roi).toFixed(2)}%
- Units per Batch: ${product.total_sellable_units}
- Profit per Unit: ₱${Number(product.netProfitPerUnit).toFixed(2)}

Ingredients as % of COGS: ${((Number(product.ingredients_cost) / Number(product.totalCPB)) * 100).toFixed(1)}%
Labor as % of COGS: ${((Number(product.labor_cost) / Number(product.totalCPB)) * 100).toFixed(1)}%
Expenses as % of COGS: ${((Number(product.expense_cost) / Number(product.totalCPB)) * 100).toFixed(1)}%

Based on Philippine small business standards:
1. Score their cost efficiency from 0-100
2. Identify strengths
3. Give specific cost optimization suggestions with potential savings
4. Give quick wins they can implement today
5. Consider Philippine market context (local suppliers, labor rates, etc)

Respond ONLY in this exact JSON format, no markdown, no extra text:
{
  "overallScore": <0-100>,
  "scoreLabel": "Critical" | "Needs Improvement" | "Good" | "Excellent",
  "summary": "<one sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "suggestions": [
    {
      "category": "ingredients" | "labor" | "expenses" | "pricing" | "strategy",
      "priority": "high" | "medium" | "low",
      "difficulty": "easy" | "moderate" | "hard",
      "title": "<short title>",
      "suggestion": "<specific actionable suggestion>",
      "potentialSaving": "<estimated saving or impact>"
    }
  ],
  "quickWins": ["<action 1>", "<action 2>", "<action 3>"],
  "modelUsed": "<model name>"
}
`;

// ← NEW: sales analysis prompt
const salesAnalysisPrompt = (summary, productSummary, weeklyHistory) => `
You are a business analyst for a Filipino small business owner.
Analyze their sales data and give actionable insights in simple English.
Be specific with numbers. Be encouraging but honest.
Keep it under 200 words. Use bullet points.
Start each bullet with a relevant emoji.

SALES SUMMARY:
- Today's revenue: ₱${summary.today_revenue}
- Today's profit: ₱${summary.today_profit}
- This week's revenue: ₱${summary.week_revenue}
- This month's revenue: ₱${summary.month_revenue}
- This month's profit: ₱${summary.month_profit}
- Best day profit this month: ₱${summary.best_day_profit ?? 0}

PRODUCTS THIS MONTH:
${productSummary
  .map(
    (p) =>
      `- ${p.product_name}: ${p.total_units} units sold, ₱${p.total_profit} profit`,
  )
  .join("\n")}

WEEKLY TREND (last 7 days):
${
  weeklyHistory.length > 0
    ? weeklyHistory
        .map((d) => `- ${d.date}: ₱${d.revenue} revenue, ₱${d.profit} profit`)
        .join("\n")
    : "No sales logged in the last 7 days."
}

Give 3-5 specific actionable insights.
Focus on: what's working, what needs attention, which product to push more, goal progress.
Address the owner directly as "you".
Be conversational and encouraging — this is a Filipino small business owner.
`;

// ── existing functions unchanged ──
export const getMarketPriceAnalysis = async (product) => {
  if (AVAILABLE_MODELS.length === 0) await loadModels();
  let lastError = null;

  for (const modelName of AVAILABLE_MODELS) {
    try {
      console.log(`Trying model: ${modelName}`);
      const result = await genAI.models.generateContent({
        model: modelName,
        contents: marketPriceAnalysisPrompt(product),
      });

      const text =
        result.text || result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No text returned from Gemini");

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("RAW AI RESPONSE:", text);
        throw new Error("Invalid AI response format");
      }

      const parsed = JSON.parse(jsonMatch[0]);
      parsed.modelUsed = modelName;
      return parsed;
    } catch (err) {
      if (isRetryableError(err)) {
        console.warn(`Retryable error on ${modelName}:`, err.message);
        continue;
      }
    }
  }
  throw new Error("There's something wrong, please try again later.");
};

export const getCostOptimizationSuggestions = async (product) => {
  if (AVAILABLE_MODELS.length === 0) await loadModels();

  for (const modelName of AVAILABLE_MODELS) {
    try {
      console.log(`Trying model: ${modelName}`);
      const result = await genAI.models.generateContent({
        model: modelName,
        contents: costOptimizationPrompt(product),
      });

      const text =
        result.text || result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No text returned from Gemini");

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("RAW AI RESPONSE:", text);
        throw new Error("Invalid AI response format");
      }

      const parsed = JSON.parse(jsonMatch[0]);
      parsed.modelUsed = modelName;
      return parsed;
    } catch (err) {
      console.error(`Error on ${modelName}:`, err.message);
      if (isRetryableError(err)) {
        console.warn(`Retryable error on ${modelName}, trying next...`);
        continue;
      }
      throw err;
    }
  }
  throw new Error(
    "All Gemini models are currently unavailable. Please try again later.",
  );
};

// ← NEW: sales analysis using same pattern as above
export const analyzeSalesService = async (userId) => {
  if (AVAILABLE_MODELS.length === 0) await loadModels();

  const [summary, productSummary, weeklyHistory] = await Promise.all([
    getSalesSummary(userId),
    getProductSalesSummary(userId),
    getWeeklySalesHistory(userId),
  ]);

  const prompt = salesAnalysisPrompt(summary, productSummary, weeklyHistory);

  for (const modelName of AVAILABLE_MODELS) {
    try {
      console.log(`Sales analysis trying model: ${modelName}`);
      const result = await genAI.models.generateContent({
        model: modelName,
        contents: prompt,
      });

      const text =
        result.text || result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No text returned from Gemini");

      return { analysis: text, modelUsed: modelName };
    } catch (err) {
      console.error(`Error on ${modelName}:`, err.message);
      if (isRetryableError(err)) {
        console.warn(`Retryable error on ${modelName}, trying next...`);
        continue;
      }
      throw err;
    }
  }
  throw new Error(
    "All Gemini models are currently unavailable. Please try again later.",
  );
};
