"use client";
import { ImageBlock } from "./ImageBlock";
import { Pagination } from "./Pagination";
import { Spinner } from "./Spinner";
import { useImageListContext } from "../context/ImageListContext";

function ImageList() {
  let imageContent;
  const { error, images } = useImageListContext();

  // to test image-viewer page error handling, uncomment the below error
  // throw new Error("An error");

  if (images) {
    imageContent = (
      <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {images.map(({ author, id, url, width, height, download_url }) => (
          <ImageBlock
            key={id}
            id={id}
            url={url}
            author={author}
            width={width}
            height={height}
            download_url={download_url}
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
      <Pagination />
    </div>
  );
}

export { ImageList };
