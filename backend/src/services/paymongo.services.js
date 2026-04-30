import pool from "../config/db.js";
import { handleSubscription } from "../models/paymongo.model.js";

const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY;
const PAYMONGO_URL = "https://api.paymongo.com/v1";
const isProduction = process.env.NODE_ENV === "production";

const getAuthHeader = () => {
  return "Basic " + Buffer.from(PAYMONGO_SECRET + ":").toString("base64");
};

export const createSubscriptionCheckout = async (userId, plan) => {
  const plans = {
    monthly: {
      amount: 29900,
      description: "CostIQ Premium — Monthly",
      interval: "month",
    },
    annual: {
      amount: 299900,
      description: "CostIQ Premium — Annual",
      interval: "year",
    },
  };

  const selected = plans[plan];
  if (!selected) throw new Error("Invalid plan");

  const res = await fetch(`${PAYMONGO_URL}/checkout_sessions`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        attributes: {
          billing: {
            name: "CostIQ User",
          },
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          line_items: [
            {
              currency: "PHP",
              amount: selected.amount,
              description: selected.description,
              name: "CostIQ Premium",
              quantity: 1,
            },
          ],
          payment_method_types: ["card", "gcash", "paymaya", "qrph"],
          success_url: `${isProduction ? process.env.PRODUCTION_URL : process.env.URL}/payment/success?plan=${plan}`,
          cancel_url: `${isProduction ? process.env.PRODUCTION_URL : process.env.URL}/pricing`,
          metadata: {
            userId: String(userId),
            plan,
          },
        },
      },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.log("PAYMONGO ERROR: ", errText);
    throw new Error(`Paymongo error: ${errText}`);
  }
  const data = await res.json();
  return data.data;
};

export const handlePaymongoWebhook = async (payload) => {
  try {
    console.log("WEBHOOK HIT");

    const event = payload.data;
    const type = event.attributes.type;

    if (!type.includes("payment")) return;

    const session = event.attributes.data;
    const metadata = session?.attributes?.metadata || {};
    console.log("METADATA:", metadata);

    const userId = metadata.userId;

    console.log("USER ID:", userId);

    const plan = metadata.plan;
    const subscriptionId = session.id;

    console.log({ userId, plan, subscriptionId });

    if (!userId || !plan) return;

    const existing = await pool.query(
      "SELECT 1 FROM users WHERE subscription_id = $1",
      [subscriptionId],
    );

    if (existing.rowCount > 0) return;

    const premiumSince = new Date();
    const premiumUntil = new Date();

    if (plan === "monthly") {
      premiumUntil.setMonth(premiumUntil.getMonth() + 1);
    } else if (plan === "annual") {
      premiumUntil.setFullYear(premiumUntil.getFullYear() + 1);
    }

    const result = await handleSubscription(
      premiumSince,
      premiumUntil,
      subscriptionId,
      userId,
    );

    console.log("DB UPDATED:", result?.rowCount);
  } catch (err) {
    console.error("Webhook error:", err);
  }
};
