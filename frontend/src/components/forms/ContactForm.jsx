import { useState } from "react";
import toast from "react-hot-toast";

const SUBJECTS = [
  "General Inquiry",
  "Bug Report",
  "Premium Support",
  "Partnership",
  "Other",
];

const ContactForm = ({ compact = false }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        toast.success("Message sent! We'll get back to you soon.");
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-3xl">
          ⚡
        </div>
        <h3 className="text-xl font-bold text-slate-100">Message Sent!</h3>
        <p className="text-sm text-slate-500 max-w-xs">
          We received your message and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-xs text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name + Email */}
      <div
        className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
      >
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Maria Santos"
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="maria@email.com"
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
          Subject
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled className="text-slate-600">
            Select a subject...
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s} className="bg-slate-800">
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help..."
          rows={compact ? 4 : 5}
          className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-bold text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {loading ? "SENDING..." : "SEND MESSAGE →"}
      </button>
    </form>
  );
};

export default ContactForm;
