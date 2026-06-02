import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../../config/apiUrl";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Enter your email.");
      return;
    }
    setLoading(true);
    try {
      await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center px-6">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap'); .bebas{font-family:'Bebas Neue',sans-serif;}`}</style>

      <div className="w-full max-w-md bg-white/3 border border-white/8 rounded-2xl p-10">
        <button
          onClick={() => navigate("/login")}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors mb-8 flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Back to login
        </button>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-2xl mx-auto">
              📧
            </div>
            <h2 className="bebas text-3xl tracking-widest text-slate-100">
              CHECK YOUR EMAIL
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              If <strong className="text-slate-300">{email}</strong> has an
              account, we sent a reset link. Check your inbox and spam folder.
            </p>
            <p className="text-xs text-slate-600">
              The link expires in 1 hour.
            </p>
          </div>
        ) : (
          <>
            <h1 className="bebas text-4xl tracking-[2px] text-slate-100 mb-2">
              FORGOT PASSWORD
            </h1>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="your@email.com"
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bebas w-full bg-amber-400 hover:bg-amber-300 text-slate-900 py-3.5 rounded-xl text-[17px] tracking-[2px] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {loading ? "SENDING..." : "SEND RESET LINK"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
