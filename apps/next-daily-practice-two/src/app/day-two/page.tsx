"use client"

import { submitForm } from "@/app/day-two/actions";
import { useState } from "react";

const Page = () => {

  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const action = async (formData: FormData) => {
    const result = await submitForm(formData);
    setMessage(result.message);
    setStatus(result.status);
  }

  return (
    <>
      <form
        className="my-5 flex flex-col gap-3 items-center"
        action={action}>
        <input
          type="text"
          name="email"
          className="w-[30rem] h-10 rounded border border-pink-400 pl-1.5 outline-none"
          placeholder="Please enter your email" />
        <button
          className="w-[30rem] h-10 rounded bg-pink-400 hover:bg-pink-600 text-white transition duration-300 outline-none"
          type="submit">
          Click
        </button>
      </form>
      <div className="flex justify-center w-full">
        <p className={ status === "error" ? "text-red-400" : "text-blue-400" }>
          {message}
        </p>
      </div>
    </>
  );
}

export default Page;