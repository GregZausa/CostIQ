import { Toaster } from "react-hot-toast";
import AppRouter from "./router";
import { useTheme } from "../context/ThemeContext";

const App = () => {
  const { isDark } = useTheme();
  return (
    <div
      className={`min-h-screen ${isDark ? "bg-slate-800" : "bg-slate-50"}`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </div>
  );
};

export default App;
