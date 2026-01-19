"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormFields = z.infer<typeof schema>;

const ContactForm = () => {

  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Error while sending message");
      }

      setSubmitSuccess(result.message || "Message sent successfully");
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError(
          "There was an error while sending message. Try again in a few moments"
        );
      }
    }
  }

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3">
          <h2 className="text-3xl text-fuchsia-400">Contact us</h2>

          <input
            {...register("name")}
            className="w-[25rem] h-10 rounded border border-fuchsia-400 pl-1.5 outline-none"
            placeholder="Enter your name"
            type="text"/>
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}

          <input
            {...register("email")}
            className="w-[25rem] h-10 rounded border border-fuchsia-400 pl-1.5 outline-none"
            placeholder="Enter your email"
            type="email"/>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <textarea
            {...register("message")}
            className="w-[25rem] h-32 rounded border border-fuchsia-400 p-1.5 outline-none"
            placeholder="Enter your message">
          </textarea>
          {errors.message && (
            <p className="text-red-500">{errors.message.message}</p>
          )}

          <button
            type="submit"
            className={`w-[25rem] h-10 rounded transition duration-300 ease-in ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed text-white" : "bg-fuchsia-400 text-white hover:bg-fuchsia-600"
            }`}>
            {isSubmitting ? "Sending..." : "Submit"}
          </button>

          {submitSuccess && (
            <p className="text-green-500 text-center font-medium mt-4">
              {submitSuccess}
            </p>
          )}

          {submitError && (
            <div className="text-center mt-4">
              <p className="text-red-500 font-medium">{submitError}</p>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="mt-3 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50">
                Try again
              </button>
            </div>
          )}

        </form>
      </div>
    </>
  );
}

export default ContactForm;