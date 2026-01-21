"use client"

import Messages from "@/app/messages/page";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2),
  message: z.string().min(5).max(1000),
});

type Message = z.infer<typeof schema>;

export default function Home() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Message>({
    defaultValues: {
      name: "",
      message: "",
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: Message) => {
    try {
      const response = await fetch("api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json();

      if (!response.ok) {
        console.log("Something went wrong");
        return;
      }

      console.log("Success");

    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  }

  return (
    <>
      <main className="flex flex-col min-h-screen w-full gap-10 p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 items-center justify-center"
          action="">

          <input
            {...register("name")}
            className="w-[30rem] h-10 rounded border border-orange-300 pl-1.5 outline-none"
            type="text"
            placeholder="Enter your name"/>
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}

          <input
            {...register("message")}
            className="w-[30rem] h-10 rounded border border-orange-300 pl-1.5 outline-none"
            type="text"
            placeholder="Enter your message" />
          {errors.message && (
            <span className="text-red-600">{errors.message.message}</span>
          )}

          <button
            className="w-[30rem] h-10 rounded border border-orange-300 text-white bg-orange-300
              hover:bg-transparent hover:text-orange-300 transition duration-150 ease-in-out"
            type="submit">
            Send message
          </button>

        </form>
        <div className="flex flex-col gap-3 items-center justify-center">
          <h1 className="text-orange-300 text-3xl">All messages</h1>
          <Messages />
        </div>
      </main>
    </>
  );
}
