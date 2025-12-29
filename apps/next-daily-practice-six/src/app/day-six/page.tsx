"use client"

import { submit } from "@/app/day-six/actions";
import { useState } from "react";

const Page = () => {

  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"error" | "warning" | "success" | "">("");

  const onSubmit = async (formData: FormData) => {
    const result = await submit(formData);
    setMessage(result.message);
    setStatus(result.status);
  }

  const statusClassMap = {
    error: "text-red-500",
    warning: "text-yellow-500",
    success: "text-green-500",
  }

  return (
    <>
      <form
        className="w-full flex flex-col gap-3 items-center mt-10 mb-5"
        action={onSubmit}>
        <input
          className="w-[30rem] h-10 rounded border border-purple-300 outline-none pl-1.5"
          name="email"
          type="text"
          placeholder="Enter your email"/>
        <input
          className="w-[30rem] h-10 rounded border border-purple-300 outline-none pl-1.5"
          name="password"
          type="password"
          placeholder="Enter your password"/>
        <button
          className="w-[30rem] h-10 rounded font-semibold bg-purple-300 text-white border-2 border-purple-300
          hover:bg-transparent hover:text-purple-300 transition duration-300 ease-in-out"
          type="submit">
          Submit
        </button>
      </form>
      <div className="w-full flex items-center justify-center">
        <p className={status ? statusClassMap[status] : ""}>
          {message}
        </p>
      </div>
    </>
  );
}

export default Page;