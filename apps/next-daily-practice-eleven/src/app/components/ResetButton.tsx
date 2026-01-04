"use client"

import { useCountContext } from "@/app/context/CountContext";

const ResetButton = () => {

  const { reset } = useCountContext();

  return (
    <>
      <button
        type="button"
        onClick={reset}
        className="w-64 h-8 rounded text-white font-semibold bg-red-200 border-2 border-red-200
          hover:bg-transparent hover:text-red-200 transition duration-150 ease-in-out">
        Reset
      </button>
    </>
  );
}

export default ResetButton;