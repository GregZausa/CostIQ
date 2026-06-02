import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setIsAuthenticated, fetchCurrentUser } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");

    if (error || !token) {
      navigate("/login?error=oauth_failed");
      return;
    }

    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    fetchCurrentUser().then(() => {
      navigate("/dashboard", { replace: true });
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 text-sm">Signing you in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
