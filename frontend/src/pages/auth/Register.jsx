import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config/apiUrl";

const RegisterPage = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password || !lastName || !firstName || !confirmPassword) {
      toast.error("Please fill up all required fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, lastName, firstName }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration Failed");
        return;
      }

      localStorage.setItem("token", data.token);

      toast.success("Account created. Welcome to the war room.");

      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e8edf5] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="fixed top-1/4 right-1/4 h-125 w-125 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-white/10 bg-white/2 p-10 backdrop-blur-xl">
        <div className="mb-10">
          <div
            onClick={() => navigate("/")}
            className="mb-6 inline-block cursor-pointer font-['Bebas_Neue'] text-xl tracking-[2px]"
          >
            COST<span className="text-amber-500">IQ</span>
          </div>

          <h1 className="font-['Bebas_Neue'] text-4xl tracking-[2px]">
            JOIN THE WAR ROOM
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Free forever. No credit card. Just clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* last name */}
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[1px] text-white/40">
              Last Name
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Santos"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[1px] text-white/40">
              First Name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Maria"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-[11px] uppercase tracking-[1px] text-white/40">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="maria@email.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[1px] text-white/40">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Min. 8 characters"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[1px] text-white/40">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Repeat password"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          <div className="sm:col-span-2 mt-2">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full rounded-lg bg-amber-500 px-4 py-4 font-['Bebas_Neue'] text-lg tracking-[2px] text-[#080c14] transition-all hover:-translate-y-px hover:bg-amber-400 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "CREATING ACCOUNT..." : "CREATE FREE ACCOUNT"}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-white/40">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-amber-500 hover:text-amber-400"
          >
            Log in
          </span>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-white/30">
          <span>✓ Free forever</span>
          <span>✓ No credit card</span>
          <span>✓ Philippine market</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
