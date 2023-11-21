import {
  PAGE_LIMIT,
  TOTAL_IMAGES,
  useImageListContext,
} from "../context/ImageListContext";

function Pagination() {
  const { page: currentPage, setPage } = useImageListContext();
  const pages = TOTAL_IMAGES / PAGE_LIMIT;
  const startAtOne = (_: number, i: number) => i + 1;
  const arrayOfTotalPageNumbers: number[] = Array.from(
    { length: pages },
    startAtOne
  );

  function handlePaginationOnClick(page: number) {
    setPage(page);
  }

  function PageButtons() {
    return arrayOfTotalPageNumbers.map((page, i) => {
      return (
        <button
          key={i}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 ${
            currentPage === page ? "bg-blue-700" : ""
          }`}
          onClick={() => handlePaginationOnClick(page)}
        >
          {page}
        </button>
      );
    });
  }

  return (
    <div className="flex justify-center">
      <PageButtons />
    </div>
  );
}

export { Pagination };
