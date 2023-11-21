import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ImageList } from "../components/ImageList";

const inter = Inter({ subsets: ["latin"] });

export type PropsImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export const DEFAULT_PAGE_NUMBER = 1;
export const PAGE_LIMIT = 10;
export const TOTAL_IMAGES = 100;

async function getImageList(page: number = DEFAULT_PAGE_NUMBER) {
  const res = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${PAGE_LIMIT}`
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ImageViewer() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const images: PropsImage[] = await getImageList();

  return (
    <div className={`${inter.className}`}>
      <p>Image viewer</p>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
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
        <ImageList images={images} />
      </div>
    </div>
  );
}
