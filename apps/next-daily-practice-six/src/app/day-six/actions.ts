"use server"

import { validate, ValidationResult } from "@/app/day-six/validate";

export type Payload = {
  email: string;
  password: string;
}

export const submit = async (formData: FormData): Promise<ValidationResult> => {
  const payload = {
    email: String(formData.get("email")) ?? "",
    password: String(formData.get("password")) ?? "",
  }

  return validate(payload);
}