"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import page from "../page";
import { useImageListContext } from "../context/ImageListContext";
import { findImagesByMetaData } from "../utils/utils";

function SearchImage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { setSearchResults, setPage } = useImageListContext();

  function handleSearchTermOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const getImages = () =>
    fetch(`https://picsum.photos/v2/list?limit=100`)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });

  const { data: images, error } = useQuery<PropsImage[]>(
    ["images", page],
    getImages
  );

  function handleSearchClearClick() {
    setSearchTerm("");
    setSearchResults([]);
  }

  function handleSearchTermKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.nativeEvent.code === "Enter") {
      handleSearchButtonClick();
    }
  }

  function handleSearchButtonClick() {
    if (searchTerm.length < 1 || !images) {
      return;
    }
    const foundImages = findImagesByMetaData(searchTerm, "author", images);
    if (foundImages.length > 0) {
      setSearchResults(foundImages);
      setPage(1);
    }
  }

  return (
    <div className="flex justify-center mb-10">
      <input
        onChange={handleSearchTermOnChange}
        onKeyDown={handleSearchTermKeyDown}
        type="text"
        placeholder="Search for author"
        value={searchTerm}
        className="text-black p-2 rounded"
      />
      <button
        onClick={handleSearchButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1"
      >
        Search
      </button>
      <button
        onClick={handleSearchClearClick}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-1"
      >
        Clear
      </button>
    </div>
  );
}

export { SearchImage };
