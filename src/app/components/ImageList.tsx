"use client";
import { useState } from "react";
import { DEFAULT_PAGE_NUMBER, PropsImage } from "../image-viewer/page";
import { ImageBlock } from "./Image";

function ImageList({ images }: { images: PropsImage[] }) {
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);

  return (
    <>
      {images &&
        images.map((image) => (
          <ImageBlock
            id={image.id}
            url={image.url}
            author={""}
            width={0}
            height={0}
            download_url={""}
          />
        ))}
    </>
  );
}

export { ImageList };
