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
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [catFactError, setCatFactError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);

      const callAPIs = async () => {

        const result = await Promise.allSettled([
          fetchRandomQuote(),
          fetchCatFacts(),
        ]);

        const [quoteResult, catResult] = result;
        console.log(quoteResult);
        console.log(catResult);

        if (quoteResult.status === "fulfilled") {
          setRanQuote(quoteResult.value);
        } else {
          setQuoteError("Failed to fetch random quote");
        }

        if (catResult.status === "fulfilled") {
          setCatFact(catResult.value);
        } else {
          setCatFactError("Failed to fetch random cat fact");
        }

      }
      callAPIs();

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const retryQuote = async () => {
    try {
      setLoading(true);
      const result = await fetchRandomQuote();
      console.log(result);
      setRanQuote(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const retryCatFact = async () => {
    try {
      setLoading(true);
      const result = await fetchCatFacts();
      console.log(result);
      setCatFact(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <p className="text-xl text-center text-blue-400">
          I am uploading wisdom and cat facts...
        </p>
      )}

      {!loading && (
        <div className="min-h-screen w-full flex flex-col gap-10 items-center mt-10">
          {quoteError ? (
            <>
              <p className="text-center text-red-400">{quoteError}</p>
              <button
                onClick={() => {
                  setQuoteError(null);
                  retryQuote();
                }}
                className="bg-blue-400 text-white hover:bg-pink-600 w-32 h-9 rounded-lg transition duration-300"
                type="button">
                Try again
              </button>
            </>
          ) : (
            ranQuote && (
              <div className="flex items-center justify-center w-[30rem] h-fit p-10 border border-pink-400 rounded-lg">
                <p>{ranQuote.slip.advice}</p>
              </div>
            )
          )}

          {catFactError ? (
            <>
              <p className="text-center text-red-400">{catFactError}</p>
              <button
                onClick={() => {
                  setCatFactError(null);
                  retryCatFact();
                }}
                className="bg-blue-400 text-white hover:bg-pink-600 w-32 h-9 rounded-lg transition duration-300"
                type="button">
                Try again
              </button>
            </>
          ) : (
            catFact && (
              <div className="flex items-center justify-center w-[30rem] h-fit p-10 border border-pink-400 rounded-lg">
                <p>{catFact.fact}</p>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

export default Facts;