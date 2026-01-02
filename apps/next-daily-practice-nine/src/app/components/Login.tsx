"use client"

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { firebaseAuth } from "../../../firebase/firebase.config";
import { useRouter } from "next/navigation";

const Login = () => {

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">Login</h2>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-[30rem] h-10 rounded border border-pink-400 outline-none pl-1.5"/>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-[30rem] h-10 rounded border border-pink-400 outline-none pl-1.5"/>

          <button
            type="submit"
            className="w-[30rem] h-10 rounded bg-pink-400 text-white
              hover:bg-transparent hover:text-pink-400
              border border-pink-400
              transition duration-200 ease">
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
