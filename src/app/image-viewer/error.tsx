"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  function handleResetOnClick() {
    reset();
  }

  return (
    <div className="flex flex-col justify-center h-screen w-screen">
      <h2 className="text-center mb-4">Something went wrong!</h2>
      <div className="justify-center flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 w-36"
          onClick={handleResetOnClick}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
