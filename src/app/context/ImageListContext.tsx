"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useQuery } from "react-query";

export const DEFAULT_PAGE_NUMBER = 1;
export const PAGE_LIMIT = 10;
export const TOTAL_IMAGES = 100;

type PropsImageListContext = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  error: unknown;
  images: PropsImage[] | undefined;
  setSearchResults: Dispatch<SetStateAction<PropsImage[]>>;
};

const imageContextDefaultValues = {
  page: DEFAULT_PAGE_NUMBER,
  setPage: () => {},
  images: [],
  error: undefined,
  setSearchResults: () => {},
};

const ImageListContext = createContext<PropsImageListContext>(
  imageContextDefaultValues
);

export function useImageListContext() {
  return useContext(ImageListContext);
}

export function ImageListProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<number>(imageContextDefaultValues.page);
  const [searchResults, setSearchResults] = useState<PropsImage[]>([]);

  const getImages = () =>
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${PAGE_LIMIT}`)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });

  const { data: standardImages, error } = useQuery<PropsImage[]>(
    ["images", page],
    getImages,
    { keepPreviousData: true }
  );
  const images = searchResults.length > 0 ? searchResults : standardImages;

  const value = {
    page,
    setPage,
    images,
    error,
    setSearchResults,
  };

  return (
    <ImageListContext.Provider value={value}>
      {children}
    </ImageListContext.Provider>
  );
}
