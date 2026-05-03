// PremiumModal.jsx
import { useNavigate } from "react-router-dom";

const PremiumModal = () => {
  const navigate = useNavigate(); 

  return (
    <div className="absolute inset-0 z-50 backdrop-blur-lg bg-white/60 flex items-center justify-center rounded-xl">
      <div className="bg-slate-800 rounded-2xl p-6 text-white text-center max-w-sm w-full mx-4 shadow-2xl">
        <div className="text-4xl mb-3">🔒</div>
        <div className="text-lg font-bold">Premium Feature</div>
        <div className="text-sm text-slate-400 mt-2">
          Upgrade to Premium to unlock reports, financial overview, and more.
        </div>
        <button
          onClick={() => navigate("/pricing")}
          className="mt-4 w-full bg-white text-slate-800 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-100 transition-all"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default PremiumModal;
