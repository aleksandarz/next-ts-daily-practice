"use client"

import { useTodoContext } from "@/app/context/TodoContext";

const TodoFooter = () => {
  const { todos, clearCompleted } = useTodoContext();

  const remaining = todos.filter(t => !t.completed).length;

  if (todos.length === 0) return null;

  return (
    <div className="flex justify-between w-[30rem] mt-6 text-sm">
      <span>{remaining} items left</span>
      <button
        onClick={clearCompleted}
        className="text-pink-600 hover:text-pink-800"
      >
        Clear completed
      </button>
    </div>
  );
};

export default TodoFooter;