import {
  createSubscriptionCheckout,
  handlePaymongoWebhook,
} from "../services/paymongo.services.js";

export const createCheckout = async (req, res) => {
  try {
    const { plan } = req.body;
    const checkout = await createSubscriptionCheckout(req.user.id, plan);
    res.json({ url: checkout.attributes.checkout_url });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create checkout", error: err.message });
  }
};

export const paymongoWebhook = async (req, res) => {
  try {
    const payload = JSON.parse(req.body.toString());
    console.log("WEBHOOK HIT", JSON.stringify(payload, null, 2));
    await handlePaymongoWebhook(payload);
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error", err);
    res.sendStatus(500);
  }
};
