import { useState } from "react";
import { X } from "lucide-react";

const LogSaleModal = ({ products, onLog, onClose }) => {
  const [productId, setProductId] = useState(products[0]?.product_id ?? "");
  const [units, setUnits] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!productId || !units || parseInt(units) <= 0) return;
    setLoading(true);
    await onLog({ productId, unitsSold: parseInt(units), notes });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Log Today's Sales
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {new Date().toLocaleDateString("en-PH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Product select */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
              Product
            </label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
            >
              {products.map((p) => (
                <option
                  key={p.product_id}
                  value={p.product_id}
                  className="bg-slate-800"
                >
                  {p.product_name}
                </option>
              ))}
            </select>
          </div>

          {/* Units sold */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
              Units Sold
            </label>
            <input
              type="number"
              min="1"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="e.g. 50"
              className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
              Notes{" "}
              <span className="text-slate-600 normal-case tracking-normal">
                (optional)
              </span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Weekend market, rainy day"
              className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !units}
            className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {loading ? "LOGGING..." : "LOG SALE ⚡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogSaleModal;
