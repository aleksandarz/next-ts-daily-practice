
type EmailType = {
  email: string;
}

export const emailValidation = (data: EmailType): "INVALID_EMAIL" | "VALID_EMAIL" => {
  if (data.email.trim() === "" || !data.email.includes("@")) {
    return "INVALID_EMAIL";
  }

  return "VALID_EMAIL";
};

console.log(emailValidation({
  email: "aleksandar@gmail.com",
}));