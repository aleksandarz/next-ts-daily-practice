"use client"

import { useCountContext } from "@/app/context/CountContext";

const CounterDisplay = () => {

  const { count } = useCountContext();

  return (
    <>
      <div>
        <p className="text-xl">Current count: {count}</p>
      </div>
    </>
  );
}

export default CounterDisplay;