"use client";
import Image from "next/image";
import { PropsImage } from "../image-viewer/page";
import { CONST } from "../constants";

interface PropsImageBlock extends PropsImage {
  tWBackgroundColor?: string;
}

function ImageBlock({
  id,
  author,
  height,
  width,
  tWBackgroundColor = "bg-slate-800",
}: PropsImageBlock) {
  return (
    <div
      className={`p-2 m-1 border border-slate-400 shadow-lg shadow-black rounded ${tWBackgroundColor}`}
    >
      <Image
        src={`https://picsum.photos/id/${id}/${CONST.IMAGE_PREVIEW_WIDTH}/${CONST.IMAGE_PREVIEW_HEIGHT}`}
        alt={author}
        width={CONST.IMAGE_PREVIEW_WIDTH}
        height={CONST.IMAGE_PREVIEW_HEIGHT}
      />
      <div className="mt-1">
        <p className="text-sm">Author: {author}</p>
        <p className="text-sm">Width: {width}</p>
        <p className="text-sm">Height: {height}</p>
      </div>
    </div>
  );
}

export { ImageBlock };
