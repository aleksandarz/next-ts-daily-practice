"use client"

import { useCountContext } from "@/app/context/CountContext";

const CounterControls = () => {

  const { increment, decrement } = useCountContext();

  return (
    <>
      <div className="flex gap-3 my-5">
        <button
          type="button"
          onClick={increment}
          className="w-40 h-8 rounded text-white font-semibold bg-red-200 border-2 border-red-200
            hover:bg-transparent hover:text-red-200 transition duration-150 ease-in-out">
          Increment
        </button>
        <button
          type="button"
          onClick={decrement}
          className="w-40 h-8 rounded text-white font-semibold bg-red-200 border-2 border-red-200
            hover:bg-transparent hover:text-red-200 transition duration-150 ease-in-out">
          Decrement
        </button>
      </div>
    </>
  );
}

export default CounterControls;