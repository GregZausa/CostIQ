import { useNavigate } from "react-router-dom"

const PremiumCard = ({ message = "Unlock this feature and more with Premium." }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-6 gap-2">
      <div className="w-10 h-10 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center">
        <span className="text-lg">⚡</span>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-slate-700">Premium Feature</p>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xs">
          {message}
        </p>
      </div>
      <button
        onClick={() => navigate("/pricing")}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-all"
      >
        ⚡ Upgrade to Premium
      </button>
    </div>
  )
}

export default PremiumCard