const getOffset = (currentPage: number, listPerPage: number) => {
  return (currentPage - 1) * listPerPage;
};

export default getOffset;
