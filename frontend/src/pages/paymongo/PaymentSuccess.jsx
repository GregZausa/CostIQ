import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const plan = params.get("plan");

  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await authFetch(`${apiUrl}/auth/me`);
        const data = await res.json();
        console.log("ME RESPONSE:", data)

        if (data.user?.is_premium) {
          setStatus("success");
          clearInterval(interval)
        } else {
          setStatus("pending");
        }
      } catch (err) {
        setStatus("pending");
      }
    };

    checkStatus();

    const interval = setInterval(checkStatus, 2000);

    const timer = setTimeout(() => {
      clearInterval(interval);
      navigate("/dashboard");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl">
          {status === "success" ? "🎉" : "⏳"}
        </div>

        <h1 className="text-2xl font-bold text-slate-800">
          {status === "success"
            ? "You're now Premium!"
            : "Confirming your payment..."}
        </h1>

        <p className="text-slate-500">
          Your {plan === "annual" ? "annual" : "monthly"} subscription is being verified.
        </p>

        <p className="text-sm text-slate-400">
          Redirecting to dashboard in 5 seconds...
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-medium"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;