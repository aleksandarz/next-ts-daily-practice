"use server"

export const submit = async (formData: FormData): Promise<void> => {
  if (formData.get("email") === "" || formData.get("email") === null) {
    console.log("Email is required");
    return;
  }
  console.log("Form received");
}