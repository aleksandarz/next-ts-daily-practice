"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const schema = z.object({
  name: z.string().min(2),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10),
});

type FormFields = z.infer<typeof schema>;

export default function Home() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFields>({
    defaultValues: {
      name: "",
      rating: 1,
      comment: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await fetch(`/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(),
          ...data,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.log(error.message);
        return;
      }

      console.log("Data sent successfully");
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  }

  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3">
          <input
            {...register("name")}
            className="w-96 h-10 rounded border border-orange-300 pl-1.5 outline-none"
            type="text"
            placeholder="Enter your name"/>
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}

          <input
            {...register("rating", { valueAsNumber: true })}
            className="w-96 h-10 rounded border border-orange-300 px-1.5 outline-none"
            type="number"/>
          {errors.rating && (
            <span className="text-red-600">{errors.rating.message}</span>
          )}

          <textarea
            {...register("comment")}
            className="w-96 h-32 rounded border border-orange-300 p-1.5 outline-none"
            placeholder="Enter your comment">
          </textarea>
          {errors.comment && (
            <span className="text-red-600">{errors.comment.message}</span>
          )}

          <button
            type="submit"
            className="w-96 h-10 rounded border border-orange-300 bg-orange-300 text-white
              hover:bg-transparent hover:text-orange-300 transition duration-150 ease-in-out">
            Rate us
          </button>
        </form>
      </main>
    </>
  );
}
