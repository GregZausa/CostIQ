import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const verified = params.get("verified");
  const isSuccess = verified === "true";

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center px-6">
      <div className="text-center space-y-4 max-w-sm">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto ${
            isSuccess
              ? "bg-emerald-400/10 border border-emerald-400/30"
              : "bg-red-400/10 border border-red-400/30"
          }`}
        >
          {isSuccess ? "✓" : "✕"}
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          {isSuccess ? "Email Verified!" : "Verification Failed"}
        </h1>
        <p className="text-sm text-slate-500">
          {isSuccess
            ? "Your account is now active. Redirecting to login..."
            : "This link is invalid or expired. Please register again."}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
