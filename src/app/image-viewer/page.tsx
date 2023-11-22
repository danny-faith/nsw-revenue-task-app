"use client";
import { redirect } from "next/navigation";
import { ImageList } from "../components/ImageList";
import { SearchImage } from "../components/SearchImage";
import { ImageListProvider } from "../context/ImageListContext";
import { useSession } from "next-auth/react";

export default function ImageViewer() {
  const session = useSession();

  if (session.status === "unauthenticated") {
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
