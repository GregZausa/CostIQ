import PremiumCard from "../cards/PremiumCard"; 

const AIFeatureWrapper = ({ children, user }) => {
  if (user?.is_premium) return children;

  if (!user?.ai_trial_used) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-6 gap-3 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
        <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-lg">
          🤖
        </div>
        <div className="text-center px-4">
          <p className="text-sm font-bold text-slate-200">Try AI for Free</p>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xs">
            You have{" "}
            <strong className="text-amber-400">1 free AI analysis</strong> — no
            premium needed.
          </p>
        </div>
        {/* Render the actual AI card so they can use it */}
        <div className="w-full px-4">{children}</div>
      </div>
    );
  }

  return (
    <PremiumCard message="You've used your free AI trial. Upgrade to Premium for daily AI insights." />
  );
};

export default AIFeatureWrapper;
