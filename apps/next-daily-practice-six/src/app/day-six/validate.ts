import { Payload } from "@/app/day-six/actions";

export type ValidationResult =
  | { status: "success", message: "SUCCESS" }
  | { status: "warning", message: "PASSWORD_CANNOT_CONTAIN_PASSWORD" }
  | { status: "error", message: "EMAIL_NOT_VALID" | "PASSWORD_TOO_SHORT" }

export const validate = (payload: Payload): ValidationResult => {
  if (payload.email.trim() === "" || !payload.email.includes("@")) {
    return {
      status: "error",
      message: "EMAIL_NOT_VALID"
    }
  }

  if (payload.password.trim() === "" || payload.password.length < 6) {
    return {
      status: "error",
      message: "PASSWORD_TOO_SHORT"
    }
  }

  if (payload.password.includes("password")) {
    return {
      status: "warning",
      message: "PASSWORD_CANNOT_CONTAIN_PASSWORD"
    }
  }

  return {
    status: "success",
    message: "SUCCESS"
  }
}