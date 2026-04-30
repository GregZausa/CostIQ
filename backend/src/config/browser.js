import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const getBrowser = async () => {
  const isLocal = process.env.NODE_ENV !== "production";

  if (isLocal) {
    return await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: true,
      args: [],
    });
  }

  const executablePath = await chromium.executablePath();
  
  return await puppeteer.launch({
    args: [
      ...chromium.args,
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process", 
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: "new",
  });
};