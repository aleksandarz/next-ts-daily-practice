"use client"

import { submit } from "@/app/day-four/actions";
import { useState } from "react";

const LoginPage = () => {

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
        className="flex flex-col gap-3 w-full items-center mt-10 mb-5"
        action={onSubmit}>
        <input
          className="w-[30rem] h-10 rounded border border-cyan-400 pl-1.5 outline-none"
          type="text"
          name="email"
          placeholder="Enter your email" />
        <input
          className="w-[30rem] h-10 rounded border border-cyan-400 pl-1.5 outline-none"
          type="password"
          name="password"
          placeholder="Enter your password" />
        <button
          className="w-[30rem] h-10 rounded bg-cyan-400 text-white hover:bg-cyan-600 transition duration-300 ease-in-out"
          type="submit">
          Login
        </button>
      </form>
      <div className="flex w-full items-center justify-center">
        <p className={ status === "error" ? "text-red-400" : "text-blue-400" }>
          {message}
        </p>
      </div>
    </>
  );
}

export default LoginPage;