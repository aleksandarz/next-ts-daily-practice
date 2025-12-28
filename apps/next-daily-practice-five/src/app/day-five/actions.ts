"use server"

import { validateForm } from "@/app/day-five/validation";

export type Payload = {
  email: string;
  password: string;
  confirmPassword: string;
}

export const submit = async (formData: FormData) => {
  const payload: Payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  return validateForm(payload);
}