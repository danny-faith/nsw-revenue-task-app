"use client";
import { useState } from "react";
import {
  DEFAULT_PAGE_NUMBER,
  PAGE_LIMIT,
  PropsImage,
} from "../image-viewer/page";
import { ImageBlock } from "./Image";
import { Pagination } from "./Pagination";
import { useQuery } from "react-query";

function ImageList() {
  const [page, setPage] = useState<number>(DEFAULT_PAGE_NUMBER);

  const getImages = () =>
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${PAGE_LIMIT}`)
      .then((res) => res.json())
      .then((data) => data);

  const { data: images, isLoading } = useQuery<PropsImage[]>(
    ["images", page],
    getImages
  );

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
