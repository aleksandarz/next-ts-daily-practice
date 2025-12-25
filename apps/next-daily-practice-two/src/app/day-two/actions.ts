"use server"

export type ActionResults = {
  status: "success" | "error";
  message: string;
}

export const submitForm = async (formData: FormData): Promise<ActionResults> => {
  const email = formData.get("email") as string;
  if (!email.includes("@")) {
    return {
      status: "error",
      message: "Email address is not valid"
    };
  }
  return {
    status: "success",
    message: "Valid email address: " + email
  };
}

