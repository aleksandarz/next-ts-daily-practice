"use client"

import { TodoType } from "@/app/types/todoType";
import { useState } from "react";

const TodoList = () => {

  const [todos] = useState<TodoType[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const deleteTodo = (todoId: string) => {
    todos.forEach((todo) => {
      if (todo.todoId === todoId) {
        localStorage.removeItem("todos");
      }
    });
  }

  return (
    <>
      {todos.length > 0 && (
        todos.map((todo) => {
          return (
            <div
              className="flex flex-col gap-3 border border-orange-400 rounded w-[40rem] h-fit p-5"
              key={todo.todoId}>
              <h3 className="text-2xl text-purple-600">{todo.todoTitle}</h3>
              <p className="text-purple-600">Description: {todo.todoDescription}</p>
              <button
                onClick={() => deleteTodo(todo.todoId)}
                type="button"
                className="w-36 h-9 rounded border border-orange-400 bg-orange-400 text-white
                  hover:bg-transparent hover:text-orange-400 transition duration-150 ease-in-out">
                Delete Todo
              </button>
            </div>
          )
        })
      )}
    </>
  );
}

export default TodoList;