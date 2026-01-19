"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  message: z.string().nonempty(),
});

type FormFields = z.infer<typeof schema>;

const ContactForm = () => {

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    reset();
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

        </form>
      </div>
    </>
  );
}

export default ContactForm;