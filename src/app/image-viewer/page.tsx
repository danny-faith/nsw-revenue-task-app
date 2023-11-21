"use client";
import { redirect } from "next/navigation";
import { ImageList } from "../components/ImageList";
import { SearchImage } from "../components/SearchImage";
import { ImageListProvider } from "../context/ImageListContext";
import { useSession } from "next-auth/react";

export type PropsImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export default function ImageViewer() {
  const session = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <ImageListProvider>
      <div>
        <h1 className="text-center text-2xl mb-10">Image viewer</h1>
        <SearchImage />
        <ImageList />
      </div>
    </ImageListProvider>
  );
}
