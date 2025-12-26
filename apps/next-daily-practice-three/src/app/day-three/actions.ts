
export type ServerReturnType = {
  status: "success" | "error";
  message: string;
}

export const submit = async (formData: FormData): Promise<ServerReturnType> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email.trim() === "" || !email.includes("@")) {
    return {
      status: "error",
      message: "Please enter a valid email"
    }
  }

  if (password.trim() === "" || password.length < 6) {
    return {
      status: "error",
      message: "Password must be at least 6 characters"
    }
  }

  return {
    status: "success",
    message: "Successfully submitted",
  }
}