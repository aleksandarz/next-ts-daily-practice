
export type ValidationResult =
  | { status: "success", message: "SUCCESS" }
  | { status: "error", message: "PASSWORD_IS_TOO_SHORT" | "INVALID_EMAIL" };

export type LoginPayload = {
  email: string;
  password: string;
}

export const validateLogin = (payload: LoginPayload): ValidationResult => {
  if (payload.password.trim() === "" || payload.password.length < 6) {
    return {
      status: "error",
      message: "PASSWORD_IS_TOO_SHORT",
    }
  }

  if (payload.email.trim() === "" || !payload.email.includes("@")) {
    return {
      status: "error",
      message: "INVALID_EMAIL",
    }
  }

  return {
    status: "success",
    message: "SUCCESS"
  }
}