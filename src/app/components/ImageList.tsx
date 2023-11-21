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

  return arrayOfTotalPageNumbers.map((page) => {
    return (
      <button
        className={`${currentPage === page ? "specialClass" : ""}`}
        onClick={() => handlePaginationOnClick(page)}
      >
        {page}
      </button>
    );
  });
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
    <>
      <p>current page: {page}</p>
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
      <Pagination setPage={setPage} currentPage={page} />
    </>
  );
}

export { ImageList };
