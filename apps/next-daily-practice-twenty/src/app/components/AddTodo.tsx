"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TodoType } from "@/app/types/todoType";
import { ErrorState } from "@/app/types/errorState";

const AddTodo = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [errors, setErrors] = useState<ErrorState>({
    titleError: "",
    descriptionError: "",
  });

  const handleClick = () => {
    setErrors({ titleError: "", descriptionError: "" });

    if (todoTitle.trim() === "") {
      setErrors(prev => ({
        ...prev,
        titleError: "Title is required",
      }));
      return;
    }

    if (todoDescription.trim() === "") {
      setErrors(prev => ({
        ...prev,
        descriptionError: "Description is required",
      }));
      return;
    }

    const todo: TodoType = {
      todoId: uuidv4(),
      todoTitle,
      todoDescription,
    };

    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTodoTitle("");
    setTodoDescription("");
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        className="w-[40rem] h-10 rounded border border-orange-400 pl-1.5 outline-none"
        placeholder="Enter Todo title"/>
      {errors.titleError && (
        <p className="text-red-400">{errors.titleError}</p>
      )}

      <textarea
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
        className="w-[40rem] h-32 rounded border border-orange-400 p-1.5 outline-none"
        placeholder="Enter Todo description"/>

      {errors.descriptionError && (
        <p className="text-red-400">{errors.descriptionError}</p>
      )}

      <button
        onClick={handleClick}
        type="button"
        className="w-[40rem] h-10 rounded border border-orange-400 bg-orange-400 text-white
          hover:bg-transparent hover:text-orange-400 transition">
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
