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
  searchResults: PropsImage[];
};

const imageContextDefaultValues = {
  page: DEFAULT_PAGE_NUMBER,
  setPage: () => {},
  images: [],
  error: undefined,
  setSearchResults: () => {},
  searchResults: [],
};

function paginate(payload: PropsImage[], chunkSize = 10) {
  let paginated = [];
  for (let i = 0; i < payload.length; i += chunkSize) {
    paginated.push(payload.slice(i, i + chunkSize));
  }
  return paginated;
}

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

  // TODO: below React query hook needs to be smarter and not refetch data when pagination is being used for search results
  const { data: standardImages, error } = useQuery<PropsImage[]>(
    ["images", page],
    getImages,
    { keepPreviousData: true }
  );

  let images;
  if (searchResults.length > 0) {
    const paginatedSearchResults = paginate(searchResults, PAGE_LIMIT);
    images = paginatedSearchResults[page - 1];
  } else {
    images = standardImages;
  }

  const value = {
    page,
    setPage,
    images,
    error,
    setSearchResults,
    searchResults,
  };

  return (
    <ImageListContext.Provider value={value}>
      {children}
    </ImageListContext.Provider>
  );
}
