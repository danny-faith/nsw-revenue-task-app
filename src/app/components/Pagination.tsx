import { Dispatch, SetStateAction } from "react";
import { TOTAL_IMAGES, PAGE_LIMIT } from "../image-viewer/page";

function Pagination({
  setPage,
  currentPage,
}: {
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
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
    return arrayOfTotalPageNumbers.map((page) => {
      return (
        <button
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
