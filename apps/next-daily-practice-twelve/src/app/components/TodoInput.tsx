"use client"

import { useState } from "react";
import { useTodoContext } from "@/app/context/TodoContext";

const TodoInput = () => {

  const [todoText, setTodoText] = useState<string>("");
  const { addTodo } = useTodoContext();

  const clearInput = (): void => {
    setTodoText("");
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="w-[30rem] h-10 rounded border border-pink-400 pl-1.5 outline-none"
          type="text"
          placeholder="Enter your todo" />
        <button
          onClick={() => {
            addTodo(todoText);
            clearInput();
          }}
          className="w-[30rem] h-10 rounded text-white bg-pink-400
            hover:bg-pink-600 transition duration-150 ease-in-out"
          type="button">
          Add Todo
        </button>
      </div>
    </>
  );
}

export default TodoInput;