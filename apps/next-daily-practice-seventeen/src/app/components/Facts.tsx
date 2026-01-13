"use client"

import { useEffect, useState } from "react";
import { fetchRandomQuote } from "@/app/api/fetchRandomQuote";
import { fetchCatFacts } from "@/app/api/fetchCatFacts";

export type AdviceSlip = {
  slip: {
    id: number;
    advice: string;
  };
};

export type CatFact = {
  fact: string;
  length: number;
};

const Facts = () => {

  const [ranQuote, setRanQuote] = useState<AdviceSlip | null>(null);
  const [catFact, setCatFact] = useState<CatFact | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);

      const callAPIs = async () => {
        const [quoteData, catData] = await Promise.all([
          fetchRandomQuote(),
          fetchCatFacts(),
        ]);

        setRanQuote(quoteData);
        setCatFact(catData);
      }
      callAPIs();

    } catch (err) {
      console.log(err);
      setError("Error while fetching data. Try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (!ranQuote) return <p className="text-center text-red-400">There was an error fetching random quotes</p>;
  if (!catFact) return <p className="text-center text-red-400">There was an error fetching cat facts</p>;

  return (
    <>
      {loading ? (
        <>
          <p className="text-xl text-center text-blue-400">I am uploading wisdom and cat facts...</p>
        </>
      ) : (
        <>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="min-h-screen w-full flex flex-col gap-10 items-center mt-10">
            <div className="flex items-center justify-center w-[30rem] h-fit p-10 border border-pink-400 rounded-lg">
              <p>{ranQuote.slip.advice}</p>
            </div>

            <div className="flex items-center justify-center w-[30rem] h-fit p-10 border border-pink-400 rounded-lg">
              <p>{catFact.fact}</p>
            </div>
          </div>
        </>
        )}
    </>
  );
}

export default Facts;