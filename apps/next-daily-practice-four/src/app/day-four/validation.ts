
export type ValidationResult =
  | { status: "success"; message: "SUCCESSFULLY SUBMITTED" }
  | { status: "error"; message: "EMAIL_INVALID" | "PASSWORD_TOO_SHORT" };

export type LoginPayload = {
  email: string;
  password: string;
};

export const validateLoginPayload = (payload: LoginPayload): ValidationResult => {
  if (payload.email.trim() === "" || !payload.email.includes("@")) {
    return {
      status: "error",
      message: "EMAIL_INVALID"
    };
  }

  if (payload.password.length < 6) {
    return {
      status: "error",
      message: "PASSWORD_TOO_SHORT"
    };
  }

  return {
    status: "success",
    message: "SUCCESSFULLY SUBMITTED"
  };
};
