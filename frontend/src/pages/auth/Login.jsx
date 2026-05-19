import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";

import { apiUrl } from "../../config/apiUrl";
import { useAuth } from "../../context/useAuth";
import costIQLogo from "../../../res/cost_iq_logo_light_mode.png";

const metrics = [
  {
    label: "BREAK-EVEN REVENUE",
    value: "₱24.04",
    color: "text-blue-400",
  },
  {
    label: "ROI",
    value: "185.71%",
    color: "text-amber-400",
  },
  {
    label: "NET PROFIT / UNIT",
    value: "₱0.29",
    color: "text-green-400",
  },
];

const greetingsText = [
  "Welcome back",
  "Good to see you",
  "Ready to be profitable?",
  "Let’s build something great today",
  "Back in the war room",
  "Time to optimize your numbers",
  "Let’s make every peso count",
  "Your dashboard is waiting",
  "Strategy mode: ON",
  "Execute your next move",
  "Welcome back, commander",
  "Let’s break even and scale up",
];

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGreeting] = useState(() => {
    return greetingsText[Math.floor(Math.random() * greetingsText.length)];
  });
  const [greeting, setGreeting] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < selectedGreeting.length) {
      const timeout = setTimeout(() => {
        setGreeting((prev) => prev + selectedGreeting[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 60);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, selectedGreeting]);

  const { setIsAuthenticated, fetchCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid email or password!");
        return;
      }

      localStorage.setItem("token", data.token);

      setIsAuthenticated(true);

      await fetchCurrentUser();

      toast.success("Welcome back.");

      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e8edf5] grid grid-cols-1 lg:grid-cols-2 font-sans">
      {/* LEFT PANEL */}
      <div className="relative hidden lg:flex flex-col items-center justify-center overflow-hidden border-r border-white/5 bg-[linear-gradient(rgba(245,158,11,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.04)_1px,transparent_1px)] bg-size-[40px_40px]">
        {/* Glow */}
        <div className="absolute -left-24 -top-24 h-100 w-100 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-10">
          <img src={costIQLogo} alt="CostIQ" className="w-65 mb-8" />

          <p className="max-w-[320px] text-[15px] leading-7 text-white/40">
            Your business costing war room. Know your numbers. Own your price.
          </p>

          {/* Floating cards */}
          <div className="mt-14 flex w-full max-w-105 flex-col gap-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="animate-float flex items-center justify-between rounded-xl border border-white/10 bg-white/3 px-5 py-4 backdrop-blur-sm"
                style={{
                  animationDuration: `${4 + index}s`,
                  animationDelay: `${index * 0.4}s`,
                }}
              >
                <span className="text-[11px] tracking-[1px] text-white/40">
                  {metric.label}
                </span>

                <span
                  className={`font-['Bebas_Neue'] text-2xl tracking-wide ${metric.color}`}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-105">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-['Bebas_Neue'] text-5xl tracking-[2px] text-[#e8edf5]">
              {greeting}
              <span className="animate-pulse">|</span>
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Enter your credentials to access your war room.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="relative">
              <Mail
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />

              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full rounded-lg border border-white/10 bg-white/4 py-3.5 pl-11 pr-4 text-sm text-[#e8edf5] outline-none transition-all placeholder:text-white/25 focus:border-amber-500/50 focus:bg-amber-500/4 focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full rounded-lg border border-white/10 bg-white/4 py-3.5 pl-11 pr-4 text-sm text-[#e8edf5] outline-none transition-all placeholder:text-white/25 focus:border-amber-500/50 focus:bg-amber-500/4 focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-4 font-['Bebas_Neue'] text-lg tracking-[2px] text-[#080c14] transition-all duration-200 hover:-translate-y-px hover:bg-amber-400 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "LOGGING IN..." : "LOG IN"}

              {!isLoading && (
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              )}
            </button>
          </div>

          {/* Register */}
          <div className="mt-8 text-center text-sm text-white/40">
            No account yet?{" "}
            <span
              onClick={() => navigate("/register")}
              className="cursor-pointer font-semibold text-amber-500 hover:text-amber-400"
            >
              Create one free
            </span>
          </div>

          {/* Security */}
          <div className="mt-12 rounded-xl border border-white/5 bg-white/2 p-5 text-center">
            <div className="mb-1 text-[11px] tracking-[1px] text-white/30">
              SECURED BY
            </div>

            <div className="text-sm font-medium text-white/50">
              JWT + Rotating Refresh Tokens + bcrypt
            </div>
          </div>
        </div>
      </div>

      {/* Floating animation */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          .animate-float {
            animation-name: float;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
