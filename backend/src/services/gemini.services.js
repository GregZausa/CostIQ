import { GoogleGenAI } from "@google/genai";

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

const buildPrompt = (product) => `
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
export const getMarketPriceAnalysis = async (product) => {
  if (AVAILABLE_MODELS.length === 0) {
    await loadModels();
  }
  let lastError = null;

  for (const modelName of AVAILABLE_MODELS) {
    try {
      console.log(`Trying model: ${modelName}`);

      const result = await genAI.models.generateContent({
        model: modelName,
        contents: buildPrompt(product),
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
