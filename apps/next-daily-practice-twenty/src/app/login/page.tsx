"use client"

import { useState } from "react";
import { ErrorLoginState } from "@/app/types/errorState";
import { useLoginContext } from "@/app/context/LoginContext";
import { useRouter } from "next/navigation";

const Login = () => {

  const { setLoggedIn, setLoading } = useLoginContext();
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorLoginState>({
    usernameError: "",
    passwordError: "",
  });

  const handleClick = () => {
    setErrors({ usernameError: "", passwordError: "" });

    if (username.trim() === "") {
      setErrors(prev => ({
        ...prev,
        usernameError: "Username is required",
      }));
      return;
    }

    if (password.trim() === "" || password.length < 6) {
      setErrors(prev => ({
        ...prev,
        passwordError: "Password must be at least 6 characters",
      }));
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoggedIn(true);
      setLoading(false);
      router.replace("/dashboard");
    }, 500);
  };


  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <form
          className="flex flex-col gap-3">
          <h1 className="text-purple-600 text-3xl font-semibold">Login</h1>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[30rem] h-10 rounded border border-orange-400 pl-1.5 outline-none"
            placeholder="Enter your username"
            type="text"/>
          {errors.usernameError && (
            <p className="text-red-600">{errors.usernameError}</p>
          )}

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[30rem] h-10 rounded border border-orange-400 pl-1.5 outline-none"
            placeholder="Enter your password"
            type="password"/>
          {errors.passwordError && (
            <p className="text-red-600">{errors.passwordError}</p>
          )}

          <button
            onClick={handleClick}
            className="w-[30rem] h-10 rounded border border-orange-400 bg-orange-400 text-white
              hover:bg-transparent hover:text-orange-400 transition duration-150 ease-in-out"
            type="button">
            Login
          </button>

        </form>
      </div>
    </>
  );
}

export default Login;