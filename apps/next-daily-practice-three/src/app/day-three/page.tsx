"use client"

import { submit } from "@/app/day-three/actions";
import { useState } from "react";

const Page = () => {

  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const handleSubmit = async (formData: FormData) => {
    const response = await submit(formData);
    setMessage(response.message);
    setStatus(response.status);
  }

  return (
    <>
      <form
        className="w-full flex flex-col items-center gap-2.5 mt-10 mb-5"
        action={handleSubmit}>
        <input
          type="text"
          name="email"
          className="w-[30rem] h-10 rounded border border-pink-400 pl-1.5 outline-none"
          placeholder="Please enter your email" />
        <input
          type="password"
          name="password"
          className="w-[30rem] h-10 rounded border border-pink-400 pl-1.5 outline-none"
          placeholder="Please enter your password" />
        <button
          className="w-[30rem] h-10 rounded bg-pink-400 hover:bg-pink-600 text-white outline-none transition duration-150 ease-in-out"
          type="submit">
          Click
        </button>
      </form>
      <div className="flex items-center justify-center w-full">
        <p className={ status === "error" ? "text-red-400" : "text-green-400" }>
          {message}
        </p>
      </div>
    </>
  );
}

export default Page;