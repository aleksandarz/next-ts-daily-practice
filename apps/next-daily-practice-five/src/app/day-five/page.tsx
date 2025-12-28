"use client"

import { submit } from "@/app/day-five/actions";
import { useState } from "react";

const Page = () => {

  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (formData: FormData) => {
    const result = await submit(formData);
    setMessage(result.message);
    setStatus(result.status);
  }

  return (
    <>
      <form
        className="flex flex-col gap-3 items-center mt-10 mb-5"
        action={onSubmit}>
        <input
          name="email"
          className="w-[30rem] h-10 rounded border border-orange-400 pl-1.5 outline-none"
          placeholder="Enter your email"
          type="text"/>
        <input
          name="password"
          className="w-[30rem] h-10 rounded border border-orange-400 pl-1.5 outline-none"
          placeholder="Enter your password"
          type="password"/>
        <input
          name="confirmPassword"
          className="w-[30rem] h-10 rounded border border-orange-400 pl-1.5 outline-none"
          placeholder="Confirm your password"
          type="password"/>
        <button
          className="w-[30rem] h-10 rounded text-white bg-orange-400 border border-orange-400
          hover:bg-transparent hover:text-orange-400 transition duration-200 ease-in"
          type="submit">
          Submit
        </button>
      </form>
      <div className="w-full flex items-center justify-center">
        <p className={ status === "error" ? "text-red-500" : "text-blue-500" }>
          {message}
        </p>
      </div>
    </>
  );
}

export default Page;