"use client";
import Image from "next/image";
import { PropsImage } from "../image-viewer/page";

function ImageBlock({ id }: PropsImage) {
  return (
    <Image
      src={`https://picsum.photos/id/${id}/367/267`}
      alt={""}
      width={367}
      height={267}
    />
  );
}

export { ImageBlock };
