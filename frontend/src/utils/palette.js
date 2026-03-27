export const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
};

export const costPerProductColor = {
  Materials: { fill: "#818cf8", light: "#e0e7ff" },
  Labor: { fill: "#a78bfa", light: "#ede9fe" },
  Others: { fill: "#38bdf8", light: "#e0f2fe" },
}
