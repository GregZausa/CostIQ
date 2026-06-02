import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../../config/apiUrl";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const handleSubmit = async () => {
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      setDone(true);
      setTimeout(() => navigate("/login"), 3000);
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
        {done ? (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h2 className="bebas text-3xl tracking-widest text-slate-100">
              PASSWORD RESET!
            </h2>
            <p className="text-sm text-slate-500">
              Redirecting to login in 3 seconds...
            </p>
          </div>
        ) : (
          <>
            <h1 className="bebas text-4xl tracking-[2px] text-slate-100 mb-2">
              RESET PASSWORD
            </h1>
            <p className="text-sm text-slate-500 mb-8">
              Enter your new password below.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "New Password",
                  value: password,
                  set: setPassword,
                  placeholder: "Min. 8 characters",
                },
                {
                  label: "Confirm Password",
                  value: confirm,
                  set: setConfirm,
                  placeholder: "Repeat password",
                },
              ].map((f, i) => (
                <div key={i} className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                    {f.label}
                  </label>
                  <input
                    type="password"
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
                  />
                </div>
              ))}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bebas w-full bg-amber-400 hover:bg-amber-300 text-slate-900 py-3.5 rounded-xl text-[17px] tracking-[2px] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "RESETTING..." : "RESET PASSWORD"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
