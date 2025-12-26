
export type ValidationResult =
  | { status: "success" }
  | { status: "error"; reason: "EMAIL_INVALID" | "PASSWORD_TOO_SHORT" };

export type LoginPayload = {
  email: string;
  password: string;
};

export const validateLoginPayload = (payload: LoginPayload): ValidationResult => {
  if (payload.email.trim() === "" || !payload.email.includes("@")) {
    return {
      status: "error",
      reason: "EMAIL_INVALID",
    }
  }

  if (payload.password.trim() === "" || payload.password.length < 6) {
    return {
      status: "error",
      reason: "PASSWORD_TOO_SHORT",
    }
  }

  return {
    status: "success",
  }
}