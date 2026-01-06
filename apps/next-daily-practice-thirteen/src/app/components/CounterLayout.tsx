"use client"

import { useCounterContext } from "@/app/context/CounterContext";

const CounterLayout = () => {

  const { step, count, increment, decrement, changeStep } = useCounterContext();

  return (
    <>
      <div className="flex flex-col gap-5 items-center mt-20">
        <p className="text-xl font-semibold">Count: {count}</p>
        <label htmlFor="step" className="flex flex-col gap-1.5 font-semibold">
          Increase step
          <select
            value={step}
            onChange={(e) => changeStep(Number(e.target.value))}
            id="step"
            className="w-96 h-8 rounded border border-pink-900">
            <option selected={true} value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </label>
        <div className="space-x-5 p-5">
          <button
            onClick={increment}
            className="w-64 h-8 rounded bg-pink-700 text-white hover:bg-pink-900 transition duration-300"
            type="button">
            Increment
          </button>
          <button
            onClick={decrement}
            className="w-64 h-8 rounded bg-pink-700 text-white hover:bg-pink-900 transition duration-300"
            type="button">
            Decrement
          </button>
        </div>
      </div>
    </>
  );
}

export default CounterLayout;