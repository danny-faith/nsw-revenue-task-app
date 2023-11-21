"use client";
import Image from "next/image";
import { PropsImage } from "../image-viewer/page";
import { CONST } from "../constants";

function ImageBlock({ id, author, height, width }: PropsImage) {
  return (
    <div>
      <Image
        src={`https://picsum.photos/id/${id}/${CONST.IMAGE_PREVIEW_WIDTH}/${CONST.IMAGE_PREVIEW_HEIGHT}`}
        alt={author}
        width={367}
        height={267}
      />
      <p className="text-sm">Author: {author}</p>
      <p className="text-sm">Width: {width}</p>
      <p className="text-sm">Height: {height}</p>
    </div>
  );
}

export { ImageBlock };
