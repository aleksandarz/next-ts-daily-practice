"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { MoviesType } from "@/app/types";
import { v4 as uuidv4 } from 'uuid';

const fetchMovies = async () => {
  try {
    const res = await fetch(`/api/watchlist`);
    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
  }
}

const schema = z.object({
  title: z.string().nonempty(),
  year: z.number().min(1900).max(2026),
  watched: z.boolean(),
});

type MoviesSchema = z.infer<typeof schema>;

export default function Home() {

  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [serverMessage, setServerMessage] = useState<string>("");

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<MoviesSchema>({
    defaultValues: {
      title: "",
      year: 1,
      watched: false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<MoviesSchema> = async (data) => {
    try {
      const res = await fetch(`/api/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(),
          ...data,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerMessage(result.message || "Something went wrong");
      }

      setServerMessage(result.message || "Movie added successfully");
    } catch (error) {
      console.error(error);
      setServerMessage("Network error. Please try again.");
    } finally {
      reset();
    }
  }

  const callAPI = async () => {
    const data = await fetchMovies();
    setMovies(data);
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <>
      <main className="w-full min-h-screen flex justify-center items-center gap-30">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[50%] h-[100%] flex flex-col gap-3 items-center gap-3">
          <input
            {...register("title")}
            className="w-96 h-10 rounded border border-orange-400 pl-1.5 outline-none"
            type="text"
            placeholder="Enter movie title"/>
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}

          <input
            {...register("year", { valueAsNumber: true })}
            className="w-96 h-10 rounded border border-orange-400 px-1.5 outline-none"
            type="number"
            placeholder="Enter movie year"/>
          {errors.year && (
            <p className="text-red-600">{errors.year.message}</p>
          )}

          <button
            disabled={isSubmitting}
            className="w-96 h-10 rounded border border-orange-400 text-white bg-orange-400
              hover:bg-transparent hover:text-orange-400 transition duration-150 ease-in-out"
            type="submit">
            {isSubmitting ? "Sending..." : "Add movie"}
          </button>

          {serverMessage && (
            <p className="text-red-600">{serverMessage}</p>
          )}
        </form>
        <div className="w-[50%] h-[100%] flex flex-col gap-3">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id}>
                <h2 className="font-semibold">{movie.title}</h2>
                <p>Year: {movie.year}</p>
                <input type="checkbox"/>
              </div>
            ))
          ) : (
            <div className="w-[50%] h-[100%]">
              <button
                onClick={callAPI}
                className="w-64 h-10 rounded border border-orange-400 text-white bg-orange-400
                  hover:bg-transparent hover:text-orange-400 transition duration-150 ease-in-out"
                type="button">
                Retry
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
