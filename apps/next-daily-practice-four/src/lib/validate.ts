
export type LoginError = "EMAIL_INVALID" | "PASSWORD_TOO_SHORT";

export const loginError = (error: LoginError) => {
  switch (error) {
    case "EMAIL_INVALID":
      return {
        status: "error",
        message: "Email invalid"
      }
    case "PASSWORD_TOO_SHORT":
      return {
        status: "error",
        message: "Password is too short"
      }
    default:
      return {
        status: "error",
        message: "Something went wrong"
      }
  }
}
