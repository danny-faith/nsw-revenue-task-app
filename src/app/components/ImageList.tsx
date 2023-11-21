"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DEFAULT_PAGE_NUMBER,
  PAGE_LIMIT,
  PropsImage,
  TOTAL_IMAGES,
} from "../image-viewer/page";
import { ImageBlock } from "./Image";

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

function ImageList() {
  const [images, setImages] = useState<PropsImage[]>([]);
  const [page, setPage] = useState<number>(DEFAULT_PAGE_NUMBER);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${PAGE_LIMIT}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setImages(data);
      });
  }, [page]);

  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          {images &&
            images.map((image) => (
              <ImageBlock
                key={image.id}
                id={image.id}
                url={image.url}
                author={""}
                width={0}
                height={0}
                download_url={""}
              />
            ))}
        </div>
      </div>
      <Pagination setPage={setPage} currentPage={page} />
    </div>
  );
}

export { ImageList };
