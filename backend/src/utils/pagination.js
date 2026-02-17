export const getPaginationParams = (req, defaultLimit = 8) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || defaultLimit;
  const searchTerm = req.query.search || "";
  const offset = (page - 1) * limit;

  const createdBy = req.user?.id;

  return {
    page,
    limit,
    offset,
    searchTerm,
    createdBy,
  };
};
