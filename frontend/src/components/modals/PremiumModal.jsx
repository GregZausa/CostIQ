// PremiumModal.jsx
import { useNavigate } from "react-router-dom";

const PremiumModal = ({
  message = "Unlock this feature and more with Premium.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-50 backdrop-blur-lg bg-white/60 flex items-center justify-center rounded-xl">
      <div className=" rounded-2xl p-6 text-white text-center max-w-sm w-full mx-4 shadow-2xl">
        <span className=" w-12 h-12 rounded-full bg-yellow-50 border border-yellow-200 text-xl">
          ⚡
        </span>
        <div className="text-center">
          <p className="text-md font-bold text-slate-700">Premium Feature</p>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed max-w-sm">
            {message}
          </p>
        </div>
        <button
          onClick={() => navigate("/pricing")}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-all"
        >
          ⚡ Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default PremiumModal;
