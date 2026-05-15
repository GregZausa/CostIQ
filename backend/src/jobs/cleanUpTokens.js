import cron from "node-cron";
import { cleanupExpiredTokens } from "../models/user.model.js";

cron.schedule("0 0 * * *", async () => {
  console.log("Cleaning up expired refresh tokens...");
  await cleanupExpiredTokens();
});
