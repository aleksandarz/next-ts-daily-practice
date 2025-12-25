
export type LoginPayload = {
  email: string,
  password: string,
}

export const validateLoginPayload = (loginPayload: LoginPayload): "INVALID_INPUT" | "VALID_INPUT" => {
  if (loginPayload.email === "" || !loginPayload.email.includes("@") || loginPayload.password.length < 6) {
    return "INVALID_INPUT";
  }
  return "VALID_INPUT";
}