export const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
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
