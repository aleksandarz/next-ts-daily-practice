"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { CountType } from "@/app/types/CountType";

export const CounterContext = createContext<CountType | undefined>(undefined);

export const useCounterContext = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error("useCounterContext must be within CounterProvider");
  }
  return context;
}

export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  const increment = () => { setCount(count + step); }
  const decrement = () => { setCount(count - step); }
  const changeStep = (newStep: number) => { setStep(newStep); }

  return (
    <>
      <CounterContext.Provider value={{count, step, increment, decrement, changeStep}}>
        {children}
      </CounterContext.Provider>
    </>
  )
}