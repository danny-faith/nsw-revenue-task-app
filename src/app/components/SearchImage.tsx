"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import { PropsImage } from "../image-viewer/page";
import page from "../page";

function SearchImage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  function findImagesByMetaData(
    searchTerm: string,
    key: string,
    images: PropsImage[]
  ) {
    const res = images.filter((image) => {
      if (image.author.toLowerCase().includes(searchTerm)) return true;
    });
    console.log("res", res);
    return res;
  }

  function handleSearchClearClick() {
    setSearchTerm("");
  }

  function handleSearchTermKeyDown() {
    handleSearchButtonClick();
  }

  function handleSearchButtonClick() {
    if (searchTerm.length < 1 || !images) return;
    const foundImages = findImagesByMetaData(searchTerm, "author", images);
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
