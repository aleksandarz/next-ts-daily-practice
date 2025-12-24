import { submit } from "@/app/day-one/actions";

const Form = () => {

  return (
    <>
      <form
        className="flex flex-col gap-3 items-center mt-10"
        action={submit}>
        <input
          className="w-96 h-10 rounded border border-pink-400 pl-1.5 outline-none"
          type="text"
          name="email"
          placeholder="Please enter your email" />
        <button
          className="w-96 h-10 rounded text-white bg-pink-400 hover:bg-pink-600 transition duration-300"
          type="submit">
          Submit form
        </button>
      </form>
    </>
  );
}

export default Form;