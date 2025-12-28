import { Payload } from "@/app/day-five/actions";

export type ValidationResult =
 | { status: "success", message: "SUBMITTED SUCCESSFULLY" }
 | { status: "error", message: "INVALID EMAIL" | "PASSWORD IS TOO SHORT" | "PASSWORDS DON'T MATCH" };

export const validateForm = (payload: Payload): ValidationResult => {
  if (payload.email.trim() === "" || !payload.email.includes("@")) {
    return {
      status: "error",
      message: "INVALID EMAIL"
    }
  }

  if (payload.password.trim() === "" || payload.password.length < 6) {
    return {
      status: "error",
      message: "PASSWORD IS TOO SHORT"
    }
  }

  if (payload.password !== payload.confirmPassword) {
    return {
      status: "error",
      message: "PASSWORDS DON'T MATCH"
    }
  }

  return {
    status: "success",
    message: "SUBMITTED SUCCESSFULLY"
  }

}