"use client";
import { ImageBlock } from "./ImageBlock";
import { Pagination } from "./Pagination";
import { Spinner } from "./Spinner";
import { useImageListContext } from "../context/ImageListContext";

function ImageList() {
  let imageContent;
  const { error, images, unsplashData } = useImageListContext();

  // to test image-viewer page error handling, uncomment the below error
  // throw new Error("An error");

  if (unsplashData) {
    imageContent = (
      <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 md:grid-cols-3 lg:text-left">
        {unsplashData.map(({ alt_description, urls, id, user }) => (
          <ImageBlock
            key={id}
            id={id}
            url={urls.thumb}
            author={user.first_name}
            width={5}
            height={5}
            download_url={"download_url"}
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
