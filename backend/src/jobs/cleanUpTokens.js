import cron from "node-cron";
import { cleanupExpiredTokens } from "../models/user.model.js";

console.log("Token cleanup job initialized");

cron.schedule("0 0 * * *", async () => {
  console.log("Running cleanup cron");

  try {
    await cleanupExpiredTokens();
    console.log("Cleanup success");
  } catch (err) {
    console.error("Cleanup failed:", err);
  }
});
