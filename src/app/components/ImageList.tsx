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
import { Spinner } from "./Spinner";

function ImageList() {
  const [page, setPage] = useState<number>(DEFAULT_PAGE_NUMBER);
  let imageContent;

  const getImages = () =>
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${PAGE_LIMIT}`)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });

  const { data: images, error } = useQuery<PropsImage[]>(
    ["images", page],
    getImages
  );
  // to test image-viewer page error handling, uncomment the below error
  // throw new Error("uh oh");

  if (images) {
    imageContent = (
      <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {images.map((image) => (
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
    );
  } else if (error) {
    imageContent = (
      <p className="text-red-500">
        ERROR: there was an issue fetching image data. Please refresh and try
        again.
      </p>
    );
  } else {
    imageContent = <Spinner />;
  }

  return (
    <div>
      <div className="flex justify-center mb-10">{imageContent}</div>
      <Pagination setPage={setPage} currentPage={page} />
    </div>
  );
}

export { ImageList };
