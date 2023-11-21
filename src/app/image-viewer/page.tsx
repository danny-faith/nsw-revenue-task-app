"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ImageList } from "../components/ImageList";
import { SearchImage } from "../components/SearchImage";
import { ImageListProvider } from "../context/ImageListContext";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export type PropsImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export default async function ImageViewer() {
  const session = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <ImageListProvider>
      <div className={`${inter.className}`}>
        <p>Image viewer</p>
        <Link
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Home{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Return home</p>
        </Link>
        <SearchImage />
        <ImageList />
      </div>
    </ImageListProvider>
  );
}
