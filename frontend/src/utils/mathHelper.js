export const sortHelper = (arr, key, limit, desc = true) => {
  if (!arr || arr.length === 0) return [];
  return [...arr]
    .sort((a, b) => (desc ? b[key] - a[key] : a[key] - b[key]))
    .slice(0, limit)
    .map((p) => ({ name: p.product_name, data: p[key] }));
};

export const medianHelper = (arr, key) => {
  if (!arr || arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a[key] - b[key]);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid][key]
    : (sorted[mid - 1][key] + sorted[mid][key]) / 2;
};
