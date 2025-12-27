"use server"

import { LoginPayload, validateLoginPayload, ValidationResult } from "@/app/day-four/validation";

export const submit = async (formData: FormData): Promise<ValidationResult> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const payload: LoginPayload = {
    email: email,
    password: password,
  }

  return validateLoginPayload(payload);
}