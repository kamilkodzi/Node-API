const getOffset = (currentPage: number, listPerPage: number) => {
  return (currentPage - 1) * listPerPage;
};

const emptyOrRows = (rows) => {
  if (!rows) {
    return [];
  }
  return rows;
};

export = {
  getOffset,
  emptyOrRows,
};
