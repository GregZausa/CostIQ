export const getRandomColor = (isDark = false) => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = isDark ? 75 : 65;
  const lightness = isDark ? 68 : 52;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
export const costPerProductColor = {
  Materials: { fill: "#818cf8", light: "#e0e7ff" },
  Labor: { fill: "#a78bfa", light: "#ede9fe" },
  Others: { fill: "#38bdf8", light: "#e0f2fe" },
};

export const chartColors = {
  positive: {
    light: "#16a34a",
    dark: "#4ade80",
  },
  negative: {
    light: "#dc2626",
    dark: "#f87171",
  },
  stars: {
    light: "#ca8a04",
    dark: "#facc15",
  },
  optimize: {
    light: "#2563eb",
    dark: "#60a5fa",
  },
  neutral: {
    light: "#475569",
    dark: "#94a3b8",
  },
};
