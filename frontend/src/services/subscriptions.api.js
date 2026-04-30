import toast from "react-hot-toast";
import { apiUrl } from "../config/apiUrl";
import { authFetch } from "../utils/authFetch";

export const createCheckoutSession = async (plan) => {
  const res = await authFetch(`${apiUrl}/paymongo/checkout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  if (!res.ok) { toast.error("Failed to create checkout"); return; }
  const data = await res.json();
  window.location.href = data.url; 
};